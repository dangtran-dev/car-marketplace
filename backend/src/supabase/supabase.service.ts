import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private config: ConfigService) {
    const url = this.config.get('SUPABASE_URL');
    const key = this.config.get('SUPABASE_KEY');

    if (!url || !key) {
      throw new Error(
        'Missing SUPABASE_URL or SUPABASE_KEY environment variables',
      );
    }

    this.supabase = createClient(url, key);
  }

  /**
   * Upload a file buffer to Supabase Storage
   * @param bucket - storage bucket name
   * @param fileBuffer - file contents (Buffer)
   * @param originalName - original filename to keep extension
   * @param options - optional settings: { folder?: string, contentType?: string, upsert?: boolean }
   */
  async uploadFile(
    bucket: string,
    fileBuffer: Buffer,
    originalName: string,
    options?: { folder?: string; contentType?: string; upsert?: boolean },
  ) {
    const folder = options?.folder
      ? options.folder.replace(/^\/+|\/+$/g, '')
      : '';
    const ext = originalName?.split('.').pop() || '';
    const fileName = `${uuidv4()}${ext ? `.${ext}` : ''}`;
    const path = folder ? `${folder}/${fileName}` : fileName;

    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, fileBuffer, {
        contentType: options?.contentType,
        upsert: options?.upsert ?? false,
      });

    if (error) {
      throw new Error(error.message);
    }

    const { data: publicData } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return { path: data.path, publicUrl: publicData?.publicUrl };
  }

  /**
   * Create a signed URL for a file in a private bucket
   * @param bucket - storage bucket name
   * @param path - file path inside bucket
   * @param expiresIn - seconds until expiry (default 60)
   */
  async createSignedUrl(bucket: string, path: string, expiresIn = 60) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);
    if (error) throw new Error(error.message);
    return data.signedUrl;
  }
}
