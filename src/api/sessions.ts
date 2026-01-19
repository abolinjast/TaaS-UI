import { apiClient } from './client';

export interface StartSessionPayload {
    user_id: string; // Must be UUID
    course_id: string; // Must be UUID
    module: string;
    topic: string;
    activity_type: 'study' | 'quiz';
}

export interface StopSessionPayload {
    user_id: string; // Must be UUID
    notes?: string;
    quiz_score?: number | null; // Allow null
    quiz_passed?: boolean | null; // Allow null
}

export const startSession = async (data: StartSessionPayload) => {
    const response = await apiClient.post('/sessions/start', data);
    return response.data;
};

export const stopSession = async (data: StopSessionPayload) => {
    const response = await apiClient.post('/sessions/stop', data);
    return response.data;
};
