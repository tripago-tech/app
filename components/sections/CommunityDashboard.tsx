'use client'
import {
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  HStack,
  Box,
  Badge,
  Progress,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FaTrophy, FaFire, FaCamera, FaPen, FaUsers, FaStar } from 'react-icons/fa'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getCommunityChallenge, getLeaderboard } from '@/utils/gamification-engine'

export const CommunityDashboard = () => {
  const [challenges, setChallenges] = useState<any[]>([])
  const [leaderboard, setLeaderboard] = useState<any>(null)
  const [userStats, setUserStats] = useState({
    level: 5,
    points: 7500,
    rank: 1247,
    streak: 15,
    badges: 8
  })

  useEffect(() => {
    loadCommunityData()
  }, [])

  const loadCommunityData = async () => {
    try {
      const [challengeData, leaderboardData] = await Promise.all([
        getCommunityChallenge(),
        getLeaderboard('overall', 'monthly')
      ])
      
      setChallenges(challengeData)
      setLeaderboard(leaderboardData)
    } catch (error) {
      console.error('Failed to load community data:', error)
    }
  }

  return (
    <Container maxW="7xl" py={20}>
      <VStack spacing={12}>
        <VStack spacing={4} textAlign="center">
          <Heading size="2xl" color="purple.600">
            🌟 Travel Community Hub
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="3xl">
            เข้าร่วมชุมชนนักท่องเที่ยว แชร์ประสบการณ์ ชิงรางวัล และสร้างเครือข่ายเพื่อนใหม่
          </Text>
        </VStack>

        {/* User Stats Overview */}
        <Card p={8} w="full" bg="gradient-to-r from-purple-500 to-blue-500" color="white">
          <SimpleGrid columns={{ base: 2, md: 5 }} spacing={6} textAlign="center">
            <VStack>
              <Text fontSize="3xl" fontWeight="bold">Lv.{userStats.level}</Text>
              <Text fontSize="sm" opacity={0.9}>Level</Text>
            </VStack>
            <VStack>
              <Text fontSize="3xl" fontWeight="bold">{userStats.points.toLocaleString()}</Text>
              <Text fontSize="sm" opacity={0.9}>Points</Text>
            </VStack>
            <VStack>
              <Text fontSize="3xl" fontWeight="bold">#{userStats.rank}</Text>
              <Text fontSize="sm" opacity={0.9}>Rank</Text>
            </VStack>
            <VStack>
              <HStack>
                <FaFire color="orange" />
                <Text fontSize="3xl" fontWeight="bold">{userStats.streak}</Text>
              </HStack>
              <Text fontSize="sm" opacity={0.9}>Day Streak</Text>
            </VStack>
            <VStack>
              <Text fontSize="3xl" fontWeight="bold">{userStats.badges}</Text>
              <Text fontSize="sm" opacity={0.9}>Badges</Text>
            </VStack>
          </SimpleGrid>
        </Card>

        <Tabs w="full" variant="enclosed">
          <TabList>
            <Tab>🏆 Challenges</Tab>
            <Tab>📊 Leaderboard</Tab>
            <Tab>🎯 Achievements</Tab>
            <Tab>🎁 Rewards</Tab>
          </TabList>

          <TabPanels>
            {/* Challenges Tab */}
            <TabPanel px={0}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {challenges.map((challenge) => (
                  <Card key={challenge.id} p={6}>
                    <VStack spacing={4} align="stretch">
                      <HStack justify="space-between">
                        <VStack spacing={1} align="start">
                          <Heading size="md">{challenge.title}</Heading>
                          <Badge 
                            colorScheme={challenge.status === 'active' ? 'green' : 'gray'}
                            px={2} 
                            py={1}
                          >
                            {challenge.status === 'active' ? 'กำลังดำเนินการ' : 'เร็วๆ นี้'}
                          </Badge>
                        </VStack>
                        <Box textAlign="right">
                          <Text fontSize="2xl">{challenge.type === 'individual' ? '👤' : '👥'}</Text>
                        </Box>
                      </HStack>

                      <Text color="gray.600" fontSize="sm">
                        {challenge.description}
                      </Text>

                      <Box>
                        <HStack justify="space-between" mb={2}>
                          <Text fontSize="sm" fontWeight="medium">ผู้เข้าร่วม</Text>
                          <Text fontSize="sm">{challenge.participants.toLocaleString()} คน</Text>
                        </HStack>
                        <Progress 
                          value={(challenge.participants / 2000) * 100} 
                          colorScheme="purple" 
                          size="sm" 
                        />
                      </Box>

                      <VStack spacing={2} align="stretch">
                        <Text fontSize="sm" fontWeight="medium">รางวัล:</Text>
                        {challenge.rewards.winner.map((reward: any, i: number) => (
                          <HStack key={i} fontSize="sm">
                            <Text>🏆</Text>
                            <Text>{reward.name} - ฿{reward.value.toLocaleString()}</Text>
                          </HStack>
                        ))}
                      </VStack>

                      <Button 
                        colorScheme="purple" 
                        size="sm"
                        isDisabled={challenge.status !== 'active'}
                      >
                        {challenge.status === 'active' ? 'เข้าร่วมแข่งขัน' : 'เร็วๆ นี้'}
                      </Button>
                    </VStack>
                  </Card>
                ))}
              </SimpleGrid>
            </TabPanel>

            {/* Leaderboard Tab */}
            <TabPanel px={0}>
              <VStack spacing={6}>
                <HStack justify="space-between" w="full">
                  <Heading size="lg">🏆 Leaderboard ประจำเดือน</Heading>
                  <HStack>
                    <Button size="sm" variant="outline">รายสัปดาห์</Button>
                    <Button size="sm" colorScheme="purple">รายเดือน</Button>
                    <Button size="sm" variant="outline">ตลอดกาล</Button>
                  </HStack>
                </HStack>

                {leaderboard?.leaders?.map((leader: any, index: number) => (
                  <Card key={leader.userId} p={4} w="full">
                    <HStack spacing={4}>
                      <Box textAlign="center" minW="60px">
                        <Text fontSize="2xl" fontWeight="bold" color={
                          index === 0 ? 'yellow.500' : 
                          index === 1 ? 'gray.400' : 
                          index === 2 ? 'orange.500' : 'gray.600'
                        }>
                          #{leader.rank}
                        </Text>
                      </Box>

                      <Avatar size="md" src={leader.avatar} name={leader.username} />

                      <VStack spacing={1} align="start" flex={1}>
                        <HStack>
                          <Text fontWeight="bold">{leader.username}</Text>
                          <Badge colorScheme="purple">Lv.{leader.level}</Badge>
                        </HStack>
                        <HStack spacing={4} fontSize="sm" color="gray.600">
                          <Text>🏆 {leader.points.toLocaleString()} pts</Text>
                          <Text>🏅 {leader.badges} badges</Text>
                          <HStack>
                            <FaFire color="orange" />
                            <Text>{leader.streak} days</Text>
                          </HStack>
                        </HStack>
                      </VStack>

                      {index < 3 && (
                        <Box fontSize="2xl">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </Box>
                      )}
                    </HStack>
                  </Card>
                ))}

                <Button variant="outline" size="lg">
                  ดูอันดับทั้งหมด
                </Button>
              </VStack>
            </TabPanel>

            {/* Achievements Tab */}
            <TabPanel px={0}>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                {[
                  { icon: '🗺️', name: 'นักเดินทางมือใหม่', earned: true },
                  { icon: '📸', name: 'นักถ่ายรูปเที่ยว', earned: true },
                  { icon: '✍️', name: 'นักรีวิวช่วยเหลือ', earned: true },
                  { icon: '⛩️', name: 'เซียนวัด', earned: false },
                  { icon: '🏝️', name: 'นักสะสมเกาะ', earned: false },
                  { icon: '🍜', name: 'ผู้เชี่ยวชาญอาหาร', earned: true },
                  { icon: '🌟', name: 'อินฟลูเอนเซอร์', earned: false },
                  { icon: '🚀', name: 'ผู้ใช้รุ่นแรก', earned: true },
                ].map((badge, index) => (
                  <Card 
                    key={index} 
                    p={4} 
                    textAlign="center"
                    opacity={badge.earned ? 1 : 0.5}
                    bg={badge.earned ? 'yellow.50' : 'gray.50'}
                    _dark={{ 
                      bg: badge.earned ? 'yellow.900' : 'gray.800' 
                    }}
                  >
                    <VStack spacing={2}>
                      <Text fontSize="3xl">{badge.icon}</Text>
                      <Text fontSize="sm" fontWeight="medium">
                        {badge.name}
                      </Text>
                      {badge.earned && (
                        <Badge colorScheme="yellow" size="sm">
                          ได้รับแล้ว!
                        </Badge>
                      )}
                    </VStack>
                  </Card>
                ))}
              </SimpleGrid>
            </TabPanel>

            {/* Rewards Tab */}
            <TabPanel px={0}>
              <VStack spacing={6}>
                <Card p={6} w="full" bg="green.50" _dark={{ bg: 'green.900' }}>
                  <HStack justify="space-between">
                    <VStack spacing={1} align="start">
                      <Text fontSize="lg" fontWeight="bold">คะแนนที่ใช้ได้</Text>
                      <Text fontSize="3xl" fontWeight="bold" color="green.600">
                        2,500 pts
                      </Text>
                    </VStack>
                    <Button colorScheme="green">
                      ดูประวัติการใช้คะแนน
                    </Button>
                  </HStack>
                </Card>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
                  {[
                    { name: 'บัตรกำนัลร้านกล้อง', points: 1000, value: 500, type: 'voucher' },
                    { name: 'ส่วนลดโรงแรม 20%', points: 800, value: 0, type: 'discount' },
                    { name: 'อัพเกรดห้องฟรี', points: 1500, value: 0, type: 'upgrade' },
                    { name: 'ทัวร์ฟรี 1 วัน', points: 2000, value: 2000, type: 'experience' },
                    { name: 'บัตรกำนัลร้านอาหาร', points: 600, value: 300, type: 'voucher' },
                    { name: 'เสื้อยืด TripScope.AI', points: 400, value: 0, type: 'merchandise' },
                  ].map((reward, index) => (
                    <Card key={index} p={4}>
                      <VStack spacing={3} align="stretch">
                        <Text fontWeight="bold">{reward.name}</Text>
                        <HStack justify="space-between">
                          <Text fontSize="sm" color="gray.600">
                            {reward.points} คะแนน
                          </Text>
                          {reward.value > 0 && (
                            <Text fontSize="sm" color="green.600">
                              มูลค่า ฿{reward.value}
                            </Text>
                          )}
                        </HStack>
                        <Button 
                          size="sm" 
                          colorScheme="purple"
                          isDisabled={2500 < reward.points}
                        >
                          {2500 >= reward.points ? 'แลกรางวัล' : 'คะแนนไม่พอ'}
                        </Button>
                      </VStack>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}
