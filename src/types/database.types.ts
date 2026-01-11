export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            categories: {
                Row: {
                    created_at: string | null
                    icon: string | null
                    id: string
                    name: string
                    slug: string
                }
                Insert: {
                    created_at?: string | null
                    icon?: string | null
                    id?: string
                    name: string
                    slug: string
                }
                Update: {
                    created_at?: string | null
                    icon?: string | null
                    id?: string
                    name?: string
                    slug?: string
                }
                Relationships: []
            }
            orders: {
                Row: {
                    created_at: string | null
                    id: string
                    items: Json | null
                    shipping_address: Json | null
                    status: string | null
                    total: number | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    items?: Json | null
                    shipping_address?: Json | null
                    status?: string | null
                    total?: number | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    items?: Json | null
                    shipping_address?: Json | null
                    status?: string | null
                    total?: number | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "orders_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            products: {
                Row: {
                    category_id: string | null
                    created_at: string | null
                    currency: string | null
                    description: string | null
                    id: string
                    image_url: string | null
                    is_active: boolean | null
                    min_order: string | null
                    name: string
                    price_max: number | null
                    price_min: number | null
                    rating: number | null
                    supplier: string | null
                }
                Insert: {
                    category_id?: string | null
                    created_at?: string | null
                    currency?: string | null
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    is_active?: boolean | null
                    min_order?: string | null
                    name: string
                    price_max?: number | null
                    price_min?: number | null
                    rating?: number | null
                    supplier?: string | null
                }
                Update: {
                    category_id?: string | null
                    created_at?: string | null
                    currency?: string | null
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    is_active?: boolean | null
                    min_order?: string | null
                    name?: string
                    price_max?: number | null
                    price_min?: number | null
                    rating?: number | null
                    supplier?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "products_category_id_fkey"
                        columns: ["category_id"]
                        isOneToOne: false
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    }
                ]
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    company_name: string | null
                    created_at: string | null
                    full_name: string | null
                    id: string
                    phone: string | null
                    role: string | null
                    updated_at: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    company_name?: string | null
                    created_at?: string | null
                    full_name?: string | null
                    id: string
                    phone?: string | null
                    role?: string | null
                    updated_at?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    company_name?: string | null
                    created_at?: string | null
                    full_name?: string | null
                    id?: string
                    phone?: string | null
                    role?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            rfqs: {
                Row: {
                    created_at: string | null
                    id: string
                    product_name: string
                    quantity: number | null
                    specifications: string | null
                    status: string | null
                    unit: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    product_name: string
                    quantity?: number | null
                    specifications?: string | null
                    status?: string | null
                    unit?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    product_name?: string
                    quantity?: number | null
                    specifications?: string | null
                    status?: string | null
                    unit?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "rfqs_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
