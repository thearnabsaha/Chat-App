import { create } from 'zustand';

interface User {
    username: string;
    name: string;
    email: string;
    photo?: string;
}

interface UserState {
    user: User | null;
    setRoom: (user: User) => void;
    clearRoom: () => void;
}

export const useRoomStore = create<UserState>((set) => ({
    user: null,
    setRoom: (user) => set({ user }),
    clearRoom: () => set({ user: null }),
}));
