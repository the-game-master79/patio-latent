'use server';

import { supabase } from '@/lib/supabase';

export async function getProperties() {
  try {
    const { data: properties, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }

    return properties;
  } catch (error) {
    console.error('Error in getProperties:', error);
    throw error;
  }
}
