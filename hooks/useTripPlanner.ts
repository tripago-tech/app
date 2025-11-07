import { useTripStore } from '@/store/useTripStore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'
import { Place } from '@/types'

export const useTripPlanner = () => {
  const queryClient = useQueryClient()
  const {
    currentTrip,
    savedTrips,
    favorites,
    createTrip,
    addPlaceToTrip,
    removePlaceFromTrip,
    saveTrip,
    loadTrip,
    deleteTrip,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useTripStore()

  const { data: places, isLoading: placesLoading } = useQuery({
    queryKey: ['places'],
    queryFn: async () => {
      const response = await api.get('/places')
      return response.data
    },
  })

  const searchPlaces = useQuery({
    queryKey: ['places', 'search'],
    queryFn: async ({ queryKey }) => {
      const [, , query] = queryKey
      const response = await api.get(`/places/search?q=${query}`)
      return response.data
    },
    enabled: false,
  })

  const saveTripMutation = useMutation({
    mutationFn: async (trip: any) => {
      const response = await api.post('/trips', trip)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] })
      saveTrip()
    },
  })

  const deleteTripMutation = useMutation({
    mutationFn: async (tripId: string) => {
      await api.delete(`/trips/${tripId}`)
      return tripId
    },
    onSuccess: (tripId) => {
      queryClient.invalidateQueries({ queryKey: ['trips'] })
      deleteTrip(tripId)
    },
  })

  return {
    // State
    currentTrip,
    savedTrips,
    favorites,
    places,
    placesLoading,
    
    // Actions
    createTrip,
    addPlaceToTrip,
    removePlaceFromTrip,
    saveTrip: saveTripMutation.mutate,
    loadTrip,
    deleteTrip: deleteTripMutation.mutate,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    
    // Search
    searchPlaces: searchPlaces.refetch,
    searchResults: searchPlaces.data,
    isSearching: searchPlaces.isFetching,
  }
}
