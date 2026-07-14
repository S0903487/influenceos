import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createInfluencer,
  deleteInfluencer,
  listInfluencers,
  updateInfluencer,
} from '../services/influencerService';
import type { CreateInfluencerInput, UpdateInfluencerInput } from '../services/influencerService';

const INFLUENCERS_QUERY_KEY = ['influencers'];

export function useInfluencers() {
  return useQuery({
    queryKey: INFLUENCERS_QUERY_KEY,
    queryFn: listInfluencers,
    staleTime: 60 * 1000,
  });
}

export function useCreateInfluencer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInfluencerInput) => createInfluencer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INFLUENCERS_QUERY_KEY });
    },
  });
}

export function useUpdateInfluencer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInfluencerInput }) => updateInfluencer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INFLUENCERS_QUERY_KEY });
    },
  });
}

export function useDeleteInfluencer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteInfluencer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INFLUENCERS_QUERY_KEY });
    },
  });
}
