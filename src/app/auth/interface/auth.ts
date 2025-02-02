export interface MobileNumber {
    mobile_number?: number;
    message: string,
    user_id: string,

}
export interface User {
    otp: string;
    user_id?: any;
    mobile_number?: string;
    otp_verified?: boolean;
    profile_details?: any;
    gender?: string | null;
    interests?: string | null;
    signup_status?: string;
    created_at?: string;
    updated_at?: string;
    message: string,
}
export interface Login {
    message:string;
    mobile_number: string,
    password: string,
    token: string,

}