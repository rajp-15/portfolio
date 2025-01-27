export type AUTH_SLICE = {
    isAuthenticated: boolean | null;
    user: User | null;
};

export interface User {
    id: number,
    profilePic: string,
    name: string,
    username: string,
    email: string,
    city: string,
    phone: string,
}