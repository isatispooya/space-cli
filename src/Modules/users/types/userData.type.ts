interface Group {
    id: number;
    name: string;
}

interface Permission {
    id: number;
    name: string;
    codename: string;
}

export interface UserData {
    id: number;
    username: string;
    email: string | null;
    first_name: string;
    last_name: string;
    father_name: string;
    address: string;
    bio: string | null;
    birth_date: string;
    chat_id_telegram: string | null;
    created_at: string;
    date_joined: string;
    education_level: string | null;
    gender: 'M' | 'F';
    groups: Group[];
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    last_login: string | null;
    last_password_change: string | null;
    login_attempts: number;
    marital_status: string | null;
    mobile: string;
    password: string;
    place_of_birth: string;
    place_of_issue: string;
    profile_image: string | null;
    seri_shenasname: string;
    seri_shenasname_char: string;
    serial_shenasname: string;
    status: boolean;
    uniqueIdentifier: string;
    updated_at: string;
    user_permissions: Permission[];
}


export interface UserLiteData {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    mobile: string;
    uniqueIdentifier: string;
}