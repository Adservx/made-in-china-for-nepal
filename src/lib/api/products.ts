"use client"; // Note: This will be moved to separate files or used with 'use server' appropriately.
// Actually, I'll use 'use server' in separate files.

import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";



export async function getProducts() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function getCategories() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

    if (error) throw error;
    return data;
}
