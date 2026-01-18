import { apiClient } from './client';

export interface StartSessionPayload {
    user_id: string;
    course_id: string;
    module: string;
    topic: string;
    activity_type: string;
}

export interface StopSessionPayload {
    user_id: string;
    notes?: string;
    quiz_score?: number;
    quiz_passed?: boolean;
}

export const startSession = async (data: StartSessionPayload) => {
    const response = await apiClient.post('/sessions/start', data);
    return response.data;
};

export const stopSession = async (data: StopSessionPayload) => {
    const response = await apiClient.post('/sessions/stop', data);
    return response.data;
};
