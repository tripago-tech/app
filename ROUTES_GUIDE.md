# TripScope.AI - Routes Guide

## 🗺️ Complete Navigation Map

### Core Pages
| Route | Page Title | Features |
|-------|-----------|----------|
| `/` | Home | Hero search, trending destinations, top hotels, reviews, AI CTA |
| `/hotels` | Hotels List | Advanced filtering, search, sorting, responsive cards |
| `/hotels/[id]` | Hotel Details | Rooms, amenities, reviews, booking interface, location |
| `/destinations` | Destinations List | Region/theme filters, search, destination cards |
| `/destinations/[id]` | Destination Details | Highlights, activities, restaurants, tips, reviews |
| `/planner` | Trip Planner | Itinerary builder, budget tracker, expense breakdown |
| `/generate` | AI Trip Generator | Preferences form, AI itinerary generation |
| `/community` | Community Hub | Reviews, photos, leaderboard, gamification |
| `/profile` | User Dashboard | Profile, trips, reviews, wishlist, settings |
| `/blog` | Blog & Tips | Featured articles, search, categories, newsletter |
| `/auth/login` | Login | Email/password, social login, sign up link |
| `/auth/register` | Register | Sign up form, password strength, social options |

### Additional Routes (Existing)
| Route | Page Title |
|-------|-----------|
| `/travel` | Explore Places Map |
| `/trips` | My Trips |
| `/attractions` | Attractions |
| `/restaurants` | Restaurants |
| `/maps` | Interactive Map |
| `/explore` | Explore |
| `/compare` | Hotel Comparison |

---

## 🔑 Quick Navigation Links

### Hotels
- List with filters: `/hotels`
- View hotel #1: `/hotels/1`
- View hotel #2: `/hotels/2`

### Destinations
- All destinations: `/destinations`
- Bangkok detail: `/destinations/1`
- Chiang Mai detail: `/destinations/2`

### Trip Planning
- Trip planner: `/planner`
- AI generator: `/generate`

### Community & Social
- Community hub: `/community`
- User profile: `/profile`

### Content
- Blog: `/blog`

### Authentication
- Login: `/auth/login`
- Register: `/auth/register`

---

## 🎯 Key Features by Page

### Home Page (`/`)
```
Search Bar → Destination | Date | Guests
↓
Trending Destinations (4 cards)
���
Top-Rated Hotels (3 cards)
↓
AI Trip Planner CTA
↓
Recent Reviews (3 cards)
```

### Hotels Page (`/hotels`)
```
Search Input
↓
Desktop: Side Filters | Mobile: Drawer Filters
  ├── Location Search
  ├── Price Range Slider
  ├── Rating Filter
  ├── Hotel Type Select
  └── Amenities Checkboxes
↓
Hotel Listing Cards (8 hotels)
  ├── Image/Icon
  ├── Name & Location
  ├── Rating & Type Badge
  ├── Amenities
  ├── Price & Original Price
  └── View Details Button
```

### Trip Planner Page (`/planner`)
```
Tabs: Overview | Itinerary | Budget | Checklist

Overview Tab:
├── Trip Details Form
├── Quick Stats (Duration, Travelers, Budget, Items)

Itinerary Tab:
├── Add New Item Form
├── Daily Itinerary Timeline
  ├── Day 1 (Date)
  ├── Day 2 (Date)
  └── ...

Budget Tab:
├── Budget Summary Cards
├── Expense Breakdown by Type
└── Charts

Checklist Tab:
└── Pre-trip Checklist Items
```

### Community Page (`/community`)
```
Header + Write Review Button
↓
User Stats (Reviews, Photos, Points, Level)
↓
User Badges
↓
Tabs: Reviews | Photos | Contributors

Reviews Tab:
├── Recent Reviews List
├── Author Info & Rating
��── Helpful Count & Share

Photos Tab:
├── Featured Photos Grid
├── Photo Metadata

Contributors Tab:
└── Top Contributors Cards
    ├── User Info
    ├── Stats
    └── Badges
```

### Profile Page (`/profile`)
```
Header: Avatar | Name | Level | Edit/Logout
↓
Bio
↓
Stats Grid (Trips, Reviews, Photos, Points)
↓
Badges Display
↓
Tabs: My Trips | My Reviews | Saved Destinations | Preferences

My Trips Tab:
├── Create New Trip Button
└── Trip Cards (3 cards)
    ├── Status Badge
    ├── Destination & Duration
    ├── Budget Progress
    └── Highlights

Preferences Tab:
├── Account Settings
├── Privacy Settings
└── Danger Zone
```

### Blog Page (`/blog`)
```
Header + Search Bar
↓
Category Filter Buttons
↓
Featured Articles Section
├── Featured Article 1
├── Featured Article 2
└── Featured Article 3

Latest Articles List
├── Thumbnail | Content | Metadata
├── Category Badge
├── Author, Date, Read Time
└── View Count & Comments

Newsletter Section
└── Email Input + Subscribe
```

### Login Page (`/auth/login`)
```
Logo & Title
↓
Login Form:
├── Email Input
├── Password Input
├── Remember Me Checkbox
├── Sign In Button
├── Forgot Password Link

Social Login:
├── Google Button
├── Facebook Button
└── Apple Button

Sign Up Link
↓
Terms & Privacy Links
```

### Register Page (`/auth/register`)
```
Logo & Title
↓
Register Form:
├── Full Name Input
├── Email Input
├── Password Input + Strength Indicator
├── Confirm Password Input + Validation
├── Agree Terms Checkbox
├── Newsletter Checkbox
├── Create Account Button

Social Registration:
├── Google Button
├── Facebook Button
└── Apple Button

Sign In Link
```

---

## 🎨 Design Elements

### Navigation
- **Navbar**: Sticky, responsive, with menus and user options
- **Mobile Menu**: Collapsible drawer navigation
- **Footer**: Multi-column links layout

### Cards
- Hotel cards: Image + Info + Price + CTA
- Destination cards: Icon + Info + Rating + Tags
- Review cards: Avatar + Content + Engagement
- Trip cards: Progress tracking + Status badges

### Forms
- Search bars with icons
- Multi-step filtering
- Date pickers
- Dropdown selects
- Checkboxes and radio buttons

### Interactive Elements
- Tabs for section organization
- Modals for write review
- Sliders for price range
- Progress bars for budgets
- Rating stars
- Like/share buttons

---

## 🔗 Navigation Flow

### User Journey: Planning a Trip
1. Home → Search
2. Hotels → Hotel Detail → Book
3. Destinations → Destination Detail → Save
4. Planner → Build Itinerary → Save Trip
5. Community → Write Review → Share

### User Journey: Discovery
1. Home → Browse Trending
2. Destinations → Filter by Theme
3. Blog → Read Tips
4. Community → View Photos & Reviews

### User Journey: Account Management
1. Auth/Login or Auth/Register
2. Profile → View Trips
3. Profile → View Reviews
4. Profile → Update Preferences

---

## 📱 Responsive Breakpoints

All pages are optimized for:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## 🎯 CTA (Call-to-Action) Locations

- **Home**: "Plan My Trip" (floating button)
- **Hotels**: "View Details" button on each card
- **Destinations**: "Search Hotels" & "Create My Trip" buttons
- **Blog**: "Subscribe" to newsletter
- **Community**: "Write Review" button
- **Auth**: Clear login/register buttons in navbar

---

**Ready to explore? Start at [Home](/) and begin your adventure!**
