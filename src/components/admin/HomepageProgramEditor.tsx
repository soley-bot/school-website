import React, { useState, useEffect } from 'react';
import { getClientComponentClient } from '@/lib/supabase';
import type { Program, ProgramFeature } from '@/types/database';
import BasicInfoEditor from './editors/BasicInfoEditor';
import FeaturesEditor from './editors/FeaturesEditor';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface HomepageProgramEditorProps {
  programId?: string;
}

interface DatabaseProgram {
  id: string;
  name: string;
  slug: string;
  description: string;
  theme: 'blue' | 'red';
  hero_image: string;
  introduction?: {
    image?: string;
  };
  created_at: string;
  updated_at: string;
}

interface DatabaseFeature {
  id: string;
  program_id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export default function HomepageProgramEditor({ programId }: HomepageProgramEditorProps) {
  const supabase = getClientComponentClient();
  const router = useRouter();
  const [program, setProgram] = useState<Program | null>(null);
  const [features, setFeatures] = useState<ProgramFeature[]>([]);
  const [loading, setLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (!user) {
          router.replace('/admin/login');
          return;
        }
      } catch (error) {
        console.error('Auth error:', error);
        toast.error('Authentication error');
        router.replace('/admin/login');
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (programId) {
      loadProgramData();
    } else {
      setLoading(false);
    }
  }, [programId]);

  const loadProgramData = async () => {
    if (!programId) return;

    try {
      // First, fetch the program data
      const { data: rawProgramData, error: programError } = await supabase
        .from('programs')
        .select('*')
        .eq('id', programId)
        .single();

      if (programError) throw programError;
      if (!rawProgramData) {
        toast.error('Program not found');
        return;
      }

      const programData = rawProgramData as unknown as DatabaseProgram;

      // Then, fetch the features separately
      const { data: rawFeaturesData, error: featuresError } = await supabase
        .from('program_features')
        .select('*')
        .eq('program_id', programId);

      if (featuresError) throw featuresError;

      const featuresData = (rawFeaturesData || []) as unknown as DatabaseFeature[];

      // Create a properly typed program object
      const typedProgram: Program = {
        id: programData.id,
        name: programData.name,
        slug: programData.slug,
        description: programData.description,
        theme: programData.theme,
        hero_image: programData.hero_image,
        features: featuresData.map(f => ({
          id: f.id,
          program_id: f.program_id,
          title: f.title,
          description: f.description,
          icon: f.icon,
          sort_order: f.sort_order,
          created_at: f.created_at,
          updated_at: f.updated_at
        })),
        levels: [],
        schedule: {
          id: '',
          program_id: programId,
          times: { morning: '', afternoon: '', evening: '' },
          duration: {
            weekday: { hours: 0, minutes: 0 },
            weekend: { hours: 0, minutes: 0 }
          }
        },
        tuition: [],
        created_at: programData.created_at,
        updated_at: programData.updated_at,
        introduction: programData.introduction || {}
      };

      setProgram(typedProgram);
      setFeatures(typedProgram.features);
    } catch (error) {
      console.error('Error loading program data:', error);
      toast.error('Failed to load program data');
    } finally {
      setLoading(false);
    }
  };

  const handleBasicInfoUpdate = async (updatedInfo: Partial<Program>) => {
    if (!program) return;

    try {
      const updateData = {
        id: program.id,
        name: updatedInfo.name || program.name,
        slug: updatedInfo.slug || program.slug,
        description: updatedInfo.description || program.description,
        theme: updatedInfo.theme || program.theme,
        hero_image: updatedInfo.hero_image || program.hero_image,
        introduction: updatedInfo.introduction || program.introduction
      };

      const { error } = await supabase
        .from('programs')
        .upsert(updateData);

      if (error) throw error;
      setProgram(prev => prev ? { ...prev, ...updatedInfo } : null);
      toast.success('Basic info saved successfully');
      router.push('/admin/homepage');
    } catch (error) {
      console.error('Error saving basic info:', error);
      toast.error('Failed to save basic info');
    }
  };

  const handleFeaturesUpdate = async (updatedFeatures: ProgramFeature[]) => {
    try {
      const { error } = await supabase
        .from('program_features')
        .upsert(
          updatedFeatures.map(feature => ({
            id: feature.id,
            program_id: programId,
            title: feature.title,
            description: feature.description,
            icon: feature.icon,
            sort_order: feature.sort_order
          }))
        );
      if (error) throw error;
      setFeatures(updatedFeatures);
      toast.success('Features saved successfully');
      router.push('/admin/homepage');
    } catch (error) {
      console.error('Error saving features:', error);
      toast.error('Failed to save features');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!program && programId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">No program data found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
            <BasicInfoEditor
              program={program || { id: '', name: '', description: '', slug: '', theme: 'blue' } as Program}
              onUpdate={handleBasicInfoUpdate}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Program Features</h2>
            <FeaturesEditor
              features={features}
              programId={programId || ''}
              onUpdate={handleFeaturesUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 