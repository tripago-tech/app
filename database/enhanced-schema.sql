-- Enhanced database schema for next-generation travel platform

-- Users and Authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  username VARCHAR UNIQUE,
  password_hash VARCHAR,
  name VARCHAR NOT NULL,
  avatar_url VARCHAR,
  bio TEXT,
  location VARCHAR,
  phone VARCHAR,
  date_of_birth DATE,
  gender VARCHAR(10),
  
  -- Social links
  instagram_handle VARCHAR,
  facebook_profile VARCHAR,
  tiktok_handle VARCHAR,
  
  -- Verification status
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT false,
  identity_verified BOOLEAN DEFAULT false,
  influencer_verified BOOLEAN DEFAULT false,
  
  -- Preferences
  travel_style JSONB DEFAULT '[]',
  interests JSONB DEFAULT '[]',
  budget_range VARCHAR,
  language_preference VARCHAR DEFAULT 'th',
  currency_preference VARCHAR DEFAULT 'THB',
  
  -- Privacy settings
  profile_public BOOLEAN DEFAULT true,
  show_real_name BOOLEAN DEFAULT true,
  allow_messages BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  
  -- Indexes
  CONSTRAINT valid_gender CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say'))
);

-- Enhanced Hotels table
CREATE TABLE hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  name_th VARCHAR,
  description TEXT,
  description_th TEXT,
  
  -- Location details
  address TEXT,
  address_th TEXT,
  city VARCHAR NOT NULL,
  province VARCHAR NOT NULL,
  country VARCHAR DEFAULT 'Thailand',
  postal_code VARCHAR,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  
  -- Hotel details
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  hotel_type VARCHAR, -- resort, hotel, hostel, guesthouse
  chain_name VARCHAR,
  
  -- Amenities and features
  amenities JSONB DEFAULT '[]',
  room_types JSONB DEFAULT '[]',
  facilities JSONB DEFAULT '[]',
  
  -- Images and media
  images JSONB DEFAULT '[]',
  virtual_tour_url VARCHAR,
  video_url VARCHAR,
  
  -- Pricing and availability
  base_price DECIMAL(10,2),
  currency VARCHAR DEFAULT 'THB',
  price_range VARCHAR, -- budget, mid-range, luxury
  
  -- External platform IDs
  agoda_id VARCHAR,
  booking_id VARCHAR,
  expedia_id VARCHAR,
  
  -- Contact information
  phone VARCHAR,
  email VARCHAR,
  website VARCHAR,
  
  -- Status and verification
  status VARCHAR DEFAULT 'active', -- active, inactive, pending
  verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  
  -- SEO and content
  slug VARCHAR UNIQUE,
  meta_title VARCHAR,
  meta_description TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enhanced Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Review content
  title VARCHAR,
  content TEXT NOT NULL,
  content_th TEXT,
  language VARCHAR DEFAULT 'th',
  
  -- Ratings
  overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
  location_rating INTEGER CHECK (location_rating >= 1 AND location_rating <= 5),
  cleanliness_rating INTEGER CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
  service_rating INTEGER CHECK (service_rating >= 1 AND service_rating <= 5),
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
  amenities_rating INTEGER CHECK (amenities_rating >= 1 AND amenities_rating <= 5),
  
  -- Stay details
  stay_date DATE,
  room_type VARCHAR,
  trip_type VARCHAR, -- business, leisure, family, couple
  
  -- Media attachments
  photos JSONB DEFAULT '[]',
  videos JSONB DEFAULT '[]',
  
  -- AI analysis results
  ai_sentiment_score DECIMAL(3,2), -- -1 to 1
  ai_sentiment_label VARCHAR, -- positive, negative, neutral
  ai_aspects JSONB, -- aspect-based sentiment analysis
  ai_summary TEXT,
  ai_tags JSONB DEFAULT '[]',
  credibility_score DECIMAL(3,2),
  helpfulness_score DECIMAL(3,2),
  
  -- Engagement metrics
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  report_count INTEGER DEFAULT 0,
  
  -- Verification and moderation
  verified_stay BOOLEAN DEFAULT false,
  moderation_status VARCHAR DEFAULT 'approved', -- pending, approved, rejected
  moderation_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(hotel_id, user_id, stay_date)
);

-- Gamification tables
CREATE TABLE user_gamification (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  level INTEGER DEFAULT 1,
  total_points INTEGER DEFAULT 0,
  available_points INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  
  -- Statistics
  reviews_written INTEGER DEFAULT 0,
  photos_uploaded INTEGER DEFAULT 0,
  places_visited INTEGER DEFAULT 0,
  trips_shared INTEGER DEFAULT 0,
  helpful_votes_received INTEGER DEFAULT 0,
  comments_posted INTEGER DEFAULT 0,
  
  -- Social metrics
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  
  -- Leaderboard positions
  global_rank INTEGER,
  monthly_rank INTEGER,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE badges (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  name_th VARCHAR,
  description TEXT,
  description_th TEXT,
  icon VARCHAR,
  category VARCHAR NOT NULL,
  rarity VARCHAR NOT NULL, -- common, rare, epic, legendary
  requirement_type VARCHAR NOT NULL,
  requirement_target INTEGER NOT NULL,
  requirement_timeframe VARCHAR,
  points_reward INTEGER DEFAULT 0,
  is_secret BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id VARCHAR REFERENCES badges(id),
  earned_at TIMESTAMP DEFAULT NOW(),
  progress INTEGER DEFAULT 0,
  
  UNIQUE(user_id, badge_id)
);

CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR,
  points_awarded INTEGER DEFAULT 0,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  is_secret BOOLEAN DEFAULT false
);

-- Point transactions
CREATE TABLE point_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action_type VARCHAR NOT NULL,
  points_change INTEGER NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Rewards and redemptions
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  name_th VARCHAR,
  description TEXT,
  description_th TEXT,
  type VARCHAR NOT NULL, -- voucher, discount, upgrade, experience
  value DECIMAL(10,2),
  points_cost INTEGER NOT NULL,
  partner_name VARCHAR,
  partner_logo VARCHAR,
  terms JSONB DEFAULT '[]',
  expiry_date DATE,
  max_redemptions INTEGER,
  current_redemptions INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reward_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reward_id UUID REFERENCES rewards(id),
  redemption_code VARCHAR UNIQUE,
  status VARCHAR DEFAULT 'pending', -- pending, confirmed, used, expired
  redeemed_at TIMESTAMP DEFAULT NOW(),
  used_at TIMESTAMP,
  expiry_date DATE
);

-- Community challenges
CREATE TABLE community_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  title_th VARCHAR,
  description TEXT,
  description_th TEXT,
  type VARCHAR NOT NULL, -- individual, team, global
  category VARCHAR,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  requirements JSONB NOT NULL,
  rewards JSONB NOT NULL,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  status VARCHAR DEFAULT 'upcoming', -- upcoming, active, completed
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE challenge_participations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID REFERENCES community_challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  progress JSONB DEFAULT '{}',
  completed BOOLEAN DEFAULT false,
  completion_date TIMESTAMP,
  rank INTEGER,
  joined_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(challenge_id, user_id)
);

-- Trip planning and AI
CREATE TABLE ai_trip_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  
  -- Trip parameters
  destination VARCHAR NOT NULL,
  province VARCHAR,
  duration INTEGER NOT NULL,
  budget DECIMAL(10,2),
  group_size INTEGER DEFAULT 2,
  travel_style VARCHAR,
  interests JSONB DEFAULT '[]',
  
  -- Generated itinerary
  itinerary JSONB NOT NULL,
  recommended_hotels JSONB DEFAULT '[]',
  estimated_cost DECIMAL(10,2),
  
  -- AI insights
  ai_insights JSONB DEFAULT '{}',
  optimization_score DECIMAL(3,2),
  
  -- Sharing and privacy
  is_public BOOLEAN DEFAULT false,
  share_code VARCHAR UNIQUE,
  
  -- Engagement
  likes_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  
  -- Status
  status VARCHAR DEFAULT 'draft', -- draft, published, archived
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Real-time hotel prices
CREATE TABLE hotel_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  platform VARCHAR NOT NULL, -- agoda, booking, expedia, direct
  room_type VARCHAR,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER DEFAULT 2,
  
  -- Pricing details
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR DEFAULT 'THB',
  original_price DECIMAL(10,2),
  discount_percentage INTEGER,
  
  -- Availability
  available BOOLEAN DEFAULT true,
  rooms_left INTEGER,
  
  -- Booking details
  booking_url TEXT,
  cancellation_policy TEXT,
  
  -- Metadata
  last_updated TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  
  -- Indexes for fast lookups
  INDEX idx_hotel_prices_hotel_dates (hotel_id, check_in, check_out),
  INDEX idx_hotel_prices_platform (platform),
  INDEX idx_hotel_prices_updated (last_updated)
);

-- Price history for trend analysis
CREATE TABLE price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  platform VARCHAR NOT NULL,
  date DATE NOT NULL,
  average_price DECIMAL(10,2),
  min_price DECIMAL(10,2),
  max_price DECIMAL(10,2),
  availability_percentage DECIMAL(5,2),
  
  UNIQUE(hotel_id, platform, date)
);

-- Social features
CREATE TABLE user_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(follower_id, following_id),
  CHECK(follower_id != following_id)
);

CREATE TABLE user_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  target_type VARCHAR NOT NULL, -- review, trip, photo, user
  target_id UUID NOT NULL,
  interaction_type VARCHAR NOT NULL, -- like, save, share, report
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, target_type, target_id, interaction_type)
);

-- Content moderation
CREATE TABLE content_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES users(id),
  content_type VARCHAR NOT NULL, -- review, photo, profile, trip
  content_id UUID NOT NULL,
  reason VARCHAR NOT NULL,
  description TEXT,
  status VARCHAR DEFAULT 'pending', -- pending, reviewed, resolved, dismissed
  moderator_id UUID REFERENCES users(id),
  moderator_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

-- Analytics and tracking
CREATE TABLE user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR NOT NULL,
  activity_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Search and recommendations
CREATE TABLE search_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  search_query VARCHAR,
  search_filters JSONB,
  results_count INTEGER,
  clicked_results JSONB DEFAULT '[]',
  session_id VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_hotels_location ON hotels(city, province);
CREATE INDEX idx_hotels_rating ON hotels(star_rating);
CREATE INDEX idx_reviews_hotel ON reviews(hotel_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(overall_rating);
CREATE INDEX idx_reviews_date ON reviews(created_at);
CREATE INDEX idx_gamification_points ON user_gamification(total_points DESC);
CREATE INDEX idx_gamification_level ON user_gamification(level DESC);

-- Full-text search indexes
CREATE INDEX idx_hotels_search ON hotels USING gin(to_tsvector('english', name || ' ' || description));
CREATE INDEX idx_reviews_search ON reviews USING gin(to_tsvector('english', title || ' ' || content));
