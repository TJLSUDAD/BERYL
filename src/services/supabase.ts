import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bhdthtnjfomdbiiapmsi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJI...'; // Truncated for security

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getProjectFiles(projectId: string) {
  const { data, error } = await supabase
    .from('project_files')
    .select('*')
    .eq('project_id', projectId);

  if (error) throw error;
  return data;
}

export async function saveFile(projectId: string, filePath: string, content: string) {
  const { data, error } = await supabase
    .from('project_files')
    .upsert({
      project_id: projectId,
      file_path: filePath,
      content,
      updated_at: new Date().toISOString()
    });

  if (error) throw error;
  return data;
}