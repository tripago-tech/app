'use client'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Select,
  NumberInput,
  NumberInputField,
  Checkbox,
  CheckboxGroup,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Badge,
  Progress,
  Divider,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaRobot, FaMapMarkerAlt, FaDollarSign, FaClock, FaHeart, FaUtensils, FaCamera } from 'react-icons/fa'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { MapEmbed } from '@/components/content/MapEmbed'

interface TripPreferences {
  destination: string
  province: string
  duration: number
  budget: number
  travelStyle: string
  interests: string[]
  groupSize: number
  accommodation: string
  transportation: string
}

interface GeneratedItinerary {
  title: string
  description: string
  totalCost: number
  days: Array<{
    day: number
    date: string
    theme: string
    activities: Array<{
      time: string
      title: string
      description: string
      location: { lat: number, lng: number, name: string }
      type: 'attraction' | 'restaurant' | 'hotel' | 'activity'
      cost: number
      duration: string
      aiRating: number
      tips: string[]
    }>
  }>
  hotels: Array<{
    name: string
    price: number
    rating: number
    location: string
    bookingUrl: string
  }>
  aiInsights: {
    budgetOptimization: string
    bestTimeToVisit: string
    localTips: string[]
    weatherConsiderations: string
  }
}

export const AdvancedTripPlanner = () => {
  const toast = useToast()
  const [preferences, setPreferences] = useState<TripPreferences>({
    destination: '',
    province: '',
    duration: 3,
    budget: 15000, // THB
    travelStyle: 'balanced',
    interests: [],
    groupSize: 2,
    accommodation: 'hotel',
    transportation: 'car'
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState('')
  const [progress, setProgress] = useState(0)
  const [generatedTrip, setGeneratedTrip] = useState<GeneratedItinerary | null>(null)

  const provinces = [
    'Bangkok', 'Chiang Mai', 'Phuket', 'Krabi', 'Koh Samui', 'Pattaya',
    'Ayutthaya', 'Sukhothai', 'Kanchanaburi', 'Hua Hin', 'Chiang Rai', 'Pai'
  ]

  const interests = [
    'Temples & Culture', 'Street Food', 'Beaches', 'Nightlife', 'Shopping',
    'Adventure Sports', 'Nature & Wildlife', 'Photography', 'Local Markets',
    'Spa & Wellness', 'Art & Museums', 'Festivals & Events'
  ]

  const generateTrip = async () => {
    if (!preferences.destination || !preferences.province) {
      toast({
        title: 'กรุณาเลือกจุดหมายปลายทาง',
        status: 'warning',
        duration: 3000,
      })
      return
    }

    setIsGenerating(true)
    setProgress(0)

    const steps = [
      'กำลังวิเคราะห์ความต้องการของคุณ...',
      'กำลังค้นหาสถานที่ท่องเที่ยว...',
      'กำลังเช็คราคาโรงแรมแบบ Real-time...',
      'AI กำลังสร้างแผนการเดินทาง...',
      'กำลังเพิ่มคำแนะนำจากผู้เชี่ยวชาญ...',
      'เสร็จสิ้น! 🎉'
    ]

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(steps[i])
      setProgress((i + 1) * (100 / steps.length))
      await new Promise(resolve => setTimeout(resolve, 1500))
    }

    // Mock generated trip
    const mockTrip: GeneratedItinerary = {
      title: `${preferences.duration} วัน ${preferences.destination} ${preferences.travelStyle === 'luxury' ? 'หรูหรา' : preferences.travelStyle === 'budget' ? 'ประหยัด' : 'สมดุล'}`,
      description: `แผนการเดินทางที่ปรับแต่งเฉพาะคุณ สำหรับ ${preferences.groupSize} คน งบประมาณ ${preferences.budget.toLocaleString()} บาท`,
      totalCost: preferences.budget * 0.9,
      days: Array.from({ length: preferences.duration }, (_, i) => ({
        day: i + 1,
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('th-TH'),
        theme: ['วัฒนธรรมและประวัติศาสตร์', 'ธรรมชาติและผจญภัย', 'อาหารและช้อปปิ้ง'][i % 3],
        activities: [
          {
            time: '09:00',
            title: 'วัดพระแก้ว',
            description: 'วัดที่สวยงามและศักดิ์สิทธิ์ที่สุดในประเทศไทย',
            location: { lat: 13.7500, lng: 100.4917, name: 'วัดพระแก้ว กรุงเทพฯ' },
            type: 'attraction' as const,
            cost: 500,
            duration: '2 ชั่วโมง',
            aiRating: 4.8,
            tips: ['ควรแต่งกายสุภาพ', 'หลีกเลี่ยงช่วงเวลา 11:00-14:00']
          },
          {
            time: '12:00',
            title: 'ร้านอาหารริมน้ำ',
            description: 'อาหารไทยต้นตำรับพร้อมวิวแม่น้ำเจ้าพระยา',
            location: { lat: 13.7400, lng: 100.4900, name: 'ร้านอาหารริมน้ำ' },
            type: 'restaurant' as const,
            cost: 800,
            duration: '1.5 ชั่วโมง',
            aiRating: 4.6,
            tips: ['จองโต๊ะล่วงหน้า', 'ลองต้มยำกุ้ง']
          }
        ]
      })),
      hotels: [
        {
          name: 'โรงแรมแกรนด์ พาเลซ',
          price: 2500,
          rating: 4.5,
          location: 'ใกล้วัดพระแก้ว',
          bookingUrl: 'https://agoda.com/hotel/123'
        }
      ],
      aiInsights: {
        budgetOptimization: 'คุณสามารถประหยัดได้ 15% โดยเลือกโรงแรมที่ห่างจากใจกลางเมือง 2-3 กม.',
        bestTimeToVisit: 'เดือนพฤศจิกายน-กุมภาพันธ์ เป็นช่วงที่ดีที่สุด อากาศเย็นสบาย',
        localTips: [
          'ใช้แอป Grab สำหรับเดินทาง',
          'ซื้อ SIM card ที่สนามบิน',
          'เตรียมเงินสดสำหรับตลาดนัด'
        ],
        weatherConsiderations: 'อุณหภูมิ 25-32°C ควรเตรียมร่มและครีมกันแดด'
      }
    }

    setGeneratedTrip(mockTrip)
    setIsGenerating(false)
    
    toast({
      title: 'สร้างแผนการเดินทางสำเร็จ! 🎉',
      description: 'AI ได้สร้างแผนการเดินทางที่เหมาะกับคุณแล้ว',
      status: 'success',
      duration: 5000,
    })
  }

  return (
    <Box py={20} bg="gradient.primary" color="white">
      <Container maxW="7xl">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl">
              🤖 AI Trip Planner ระดับพรีเมียม
            </Heading>
            <Text fontSize="lg" opacity={0.9} maxW="3xl">
              ปัญญาประดิษฐ์ขั้นสูงที่วิเคราะห์ข้อมูลล้านรายการ เพื่อสร้างแผนการเดินทางที่เหมาะกับคุณที่สุด
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} w="full">
            {/* Advanced Preferences Form */}
            <Card p={8} bg="white" color="gray.800">
              <VStack spacing={6} align="stretch">
                <Heading size="md" color="purple.600">
                  🎯 ปรับแต่งการเดินทางของคุณ
                </Heading>

                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text mb={2} fontWeight="medium">จังหวัด</Text>
                    <Select
                      placeholder="เลือกจังหวัด"
                      value={preferences.province}
                      onChange={(e) => setPreferences({...preferences, province: e.target.value})}
                    >
                      {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </Select>
                  </Box>

                  <Box>
                    <Text mb={2} fontWeight="medium">เมือง/อำเภอ</Text>
                    <Select
                      placeholder="เลือกเมือง"
                      value={preferences.destination}
                      onChange={(e) => setPreferences({...preferences, destination: e.target.value})}
                    >
                      <option value="เมืองเก่า">เมืองเก่า</option>
                      <option value="ใจกลางเมือง">ใจกลางเมือง</option>
                      <option value="ชานเมือง">ชานเมือง</option>
                    </Select>
                  </Box>
                </SimpleGrid>

                <SimpleGrid columns={3} spacing={4}>
                  <Box>
                    <Text mb={2} fontWeight="medium">ระยะเวลา (วัน)</Text>
                    <NumberInput
                      min={1}
                      max={14}
                      value={preferences.duration}
                      onChange={(val) => setPreferences({...preferences, duration: +val})}
                    >
                      <NumberInputField />
                    </NumberInput>
                  </Box>

                  <Box>
                    <Text mb={2} fontWeight="medium">จำนวนคน</Text>
                    <NumberInput
                      min={1}
                      max={10}
                      value={preferences.groupSize}
                      onChange={(val) => setPreferences({...preferences, groupSize: +val})}
                    >
                      <NumberInputField />
                    </NumberInput>
                  </Box>

                  <Box>
                    <Text mb={2} fontWeight="medium">งบประมาณ (บาท)</Text>
                    <NumberInput
                      min={1000}
                      max={100000}
                      step={1000}
                      value={preferences.budget}
                      onChange={(val) => setPreferences({...preferences, budget: +val})}
                    >
                      <NumberInputField />
                    </NumberInput>
                  </Box>
                </SimpleGrid>

                <Box>
                  <Text mb={3} fontWeight="medium">สไตล์การเดินทาง</Text>
                  <HStack spacing={4}>
                    {[
                      { value: 'budget', label: '💰 ประหยัด', color: 'green' },
                      { value: 'balanced', label: '⚖️ สมดุล', color: 'blue' },
                      { value: 'luxury', label: '✨ หรูหรา', color: 'purple' }
                    ].map(style => (
                      <Button
                        key={style.value}
                        size="sm"
                        variant={preferences.travelStyle === style.value ? 'solid' : 'outline'}
                        colorScheme={style.color}
                        onClick={() => setPreferences({...preferences, travelStyle: style.value})}
                      >
                        {style.label}
                      </Button>
                    ))}
                  </HStack>
                </Box>

                <Box>
                  <Text mb={3} fontWeight="medium">สิ่งที่สนใจ (เลือกได้หลายอย่าง)</Text>
                  <CheckboxGroup
                    value={preferences.interests}
                    onChange={(values) => setPreferences({...preferences, interests: values as string[]})}
                  >
                    <SimpleGrid columns={2} spacing={2}>
                      {interests.map(interest => (
                        <Checkbox key={interest} value={interest} size="sm">
                          {interest}
                        </Checkbox>
                      ))}
                    </SimpleGrid>
                  </CheckboxGroup>
                </Box>

                <Divider />

                {isGenerating && (
                  <Box>
                    <Text mb={2} fontSize="sm" color="purple.600" fontWeight="medium">
                      {generationStep}
                    </Text>
                    <Progress value={progress} colorScheme="purple" size="md" borderRadius="full" />
                  </Box>
                )}

                <Button
                  colorScheme="purple"
                  size="lg"
                  leftIcon={<FaRobot />}
                  onClick={generateTrip}
                  isLoading={isGenerating}
                  loadingText="AI กำลังวางแผน..."
                  w="full"
                >
                  🚀 สร้างแผนการเดินทางด้วย AI
                </Button>
              </VStack>
            </Card>

            {/* Generated Trip Display */}
            <Card
              p={8}
              bg={generatedTrip ? 'purple.50' : 'gray.100'}
              color="gray.800"
            >
              {generatedTrip ? (
                <VStack spacing={6} align="stretch">
                  <VStack spacing={3} align="start">
                    <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
                      ✨ แผนการเดินทางพิเศษ
                    </Badge>
                    <Heading size="lg" color="purple.600">
                      {generatedTrip.title}
                    </Heading>
                    <Text color="gray.600">
                      {generatedTrip.description}
                    </Text>
                    <HStack>
                      <Text fontWeight="bold" color="green.600">
                        งบประมาณรวม: ฿{generatedTrip.totalCost.toLocaleString()}
                      </Text>
                      <Badge colorScheme="green">ประหยัด 10%</Badge>
                    </HStack>
                  </VStack>

                  {/* Daily Itinerary Preview */}
                  <VStack spacing={4} align="stretch">
                    <Text fontWeight="bold">📅 ตัวอย่างแผนการเดินทาง</Text>
                    {generatedTrip.days.slice(0, 2).map((day) => (
                      <Box key={day.day} p={4} bg="white" borderRadius="lg" border="1px solid" borderColor="purple.200">
                        <HStack justify="space-between" mb={3}>
                          <Text fontWeight="bold">วันที่ {day.day} - {day.theme}</Text>
                          <Badge colorScheme="blue">{day.date}</Badge>
                        </HStack>
                        <VStack spacing={2} align="stretch">
                          {day.activities.slice(0, 2).map((activity, i) => (
                            <HStack key={i} justify="space-between" fontSize="sm">
                              <HStack>
                                <Text fontWeight="medium">{activity.time}</Text>
                                <Text>{activity.title}</Text>
                                <Badge size="sm" colorScheme="yellow">⭐ {activity.aiRating}</Badge>
                              </HStack>
                              <Text color="green.600" fontWeight="bold">฿{activity.cost}</Text>
                            </HStack>
                          ))}
                        </VStack>
                      </Box>
                    ))}
                  </VStack>

                  {/* AI Insights */}
                  <Box p={4} bg="blue.50" borderRadius="lg">
                    <Text fontWeight="bold" mb={2} color="blue.600">
                      🧠 AI Insights & Tips
                    </Text>
                    <VStack spacing={2} align="start" fontSize="sm">
                      <Text>💡 {generatedTrip.aiInsights.budgetOptimization}</Text>
                      <Text>🌤️ {generatedTrip.aiInsights.weatherConsiderations}</Text>
                      <Text>⏰ {generatedTrip.aiInsights.bestTimeToVisit}</Text>
                    </VStack>
                  </Box>

                  <HStack spacing={3}>
                    <Button colorScheme="purple" flex={1}>
                      📋 ดูแผนเต็ม
                    </Button>
                    <Button variant="outline" colorScheme="purple" flex={1}>
                      💾 บันทึก
                    </Button>
                    <Button variant="outline" colorScheme="blue">
                      📤 แชร์
                    </Button>
                  </HStack>
                </VStack>
              ) : (
                <VStack spacing={6} textAlign="center" py={12}>
                  <Box fontSize="6xl">🤖</Box>
                  <VStack spacing={2}>
                    <Text fontWeight="bold" color="gray.600">
                      AI Trip Planner พร้อมแล้ว
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      กรอกข้อมูลและคลิก "สร้างแผนการเดินทาง" เพื่อให้ AI วางแผนให้คุณ
                    </Text>
                  </VStack>
                </VStack>
              )}
            </Card>
          </SimpleGrid>

          {/* Interactive Map Preview */}
          {generatedTrip && (
            <Card p={6} w="full" bg="white" color="gray.800">
              <VStack spacing={4} align="stretch">
                <Heading size="md" color="purple.600">
                  🗺️ แผนที่เส้นทางการเดินทาง
                </Heading>
                <MapEmbed
                  center={[13.7563, 100.5018]}
                  zoom={12}
                  height="400px"
                  markers={generatedTrip.days.flatMap(day => 
                    day.activities.map(activity => ({
                      position: [activity.location.lat, activity.location.lng] as [number, number],
                      popup: `${activity.title} - ${activity.time}`
                    }))
                  )}
                />
              </VStack>
            </Card>
          )}
        </VStack>
      </Container>
    </Box>
  )
}
