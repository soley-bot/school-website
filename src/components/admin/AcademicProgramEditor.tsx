'use client';

import React, { useState, useEffect } from 'react';
import { getClientComponentClient } from '@/lib/supabase';
import type { Program, ProgramContent, ProgramLevel, ProgramFeature, ProgramSchedule, ProgramTuition, CourseMaterial } from '@/types/database';
import { Tab } from '@headlessui/react';
import BasicInfoEditor from './editors/BasicInfoEditor';
import ContentEditor from './editors/ContentEditor';
import FeaturesEditor from './editors/FeaturesEditor';
import LevelsEditor from './editors/LevelsEditor';
import ScheduleEditor from './editors/ScheduleEditor';
import TuitionEditor from './editors/TuitionEditor';
import MaterialsEditor from './editors/MaterialsEditor';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface AcademicProgramEditorProps {
  programId?: string;
}

export default function AcademicProgramEditor({ programId }: AcademicProgramEditorProps) {
  const supabase = getClientComponentClient();
  const router = useRouter();
  const [program, setProgram] = useState<Program | null>(null);
  const [content, setContent] = useState<ProgramContent | null>(null);
  const [levels, setLevels] = useState<ProgramLevel[]>([]);
  const [features, setFeatures] = useState<ProgramFeature[]>([]);
  const [schedule, setSchedule] = useState<ProgramSchedule | null>(null);
  const [tuition, setTuition] = useState<ProgramTuition[]>([]);
  const [materials, setMaterials] = useState<CourseMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (programId) {
      loadProgramData();
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programId]);

  const loadProgramData = async () => {
    if (!programId) return;

    try {
      const { data, error } = await supabase
        .from('program_pages')
        .select(`
          *,
          features:program_features(
            id, program_id, title, description, icon, sort_order, created_at, updated_at
          ),
          levels:program_levels(
            id, program_id, title, badge, duration, weekly_hours, prerequisites, description, learning_outcomes, sort_order, created_at, updated_at
          ),
          content:program_content(
            id, program_id, section, content, created_at, updated_at
          ),
          schedule:program_schedule(
            id, program_id, times, duration, created_at, updated_at
          ),
          tuition:program_tuition(
            id, program_id, price, levels, applicable_levels, sort_order, created_at, updated_at
          ),
          materials:course_materials(
            id, program_id, title, description, image, level, sort_order, created_at, updated_at
          )
        `)
        .eq('id', programId)
        .single();

      if (error) throw error;
      if (!data) {
        toast.error('Program not found');
        return;
      }

      // Cast the data to the correct types
      const programData = data as unknown as {
        id: string;
        name: string;
        slug: string;
        type: string;
        description: string;
        theme: 'blue' | 'red';
        hero_image: string;
        features: ProgramFeature[];
        levels: ProgramLevel[];
        schedule: ProgramSchedule;
        tuition: ProgramTuition[];
        content: ProgramContent[];
        materials: CourseMaterial[];
        created_at: string;
        updated_at: string;
      };

      // Set all the state at once with proper typing
      setProgram({
        id: programData.id,
        name: programData.name,
        slug: programData.slug,
        type: (['english', 'chinese', 'ielts'].includes(programData.type) ? programData.type : 'english') as 'english' | 'chinese' | 'ielts',
        description: programData.description,
        theme: programData.theme === 'red' ? 'red' : 'blue',
        hero_image: programData.hero_image,
        features: [],
        levels: [],
        schedule: {
          id: '',
          program_id: programData.id,
          times: { morning: [], afternoon: [], evening: [] },
          duration: { weekday: { hours: 0, minutes: 0 }, weekend: { hours: 0, minutes: 0 } },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        tuition: [],
        created_at: programData.created_at,
        updated_at: programData.updated_at
      });
      setContent(programData.content?.[0] || null);
      setLevels(programData.levels || []);
      setFeatures(programData.features || []);
      setSchedule(programData.schedule || null);
      setTuition(programData.tuition || []);
      setMaterials(programData.materials || []);
    } catch (error) {
      console.error('Error loading program data:', error);
      toast.error('Failed to load program data');
    } finally {
      setLoading(false);
    }
  };

  const handleBasicInfoUpdate = async (updatedInfo: Partial<Program>) => {
    try {
      const { error } = await supabase
        .from('program_pages')
        .upsert({ ...program, ...updatedInfo });
      if (error) throw error;
      setProgram(prev => prev ? { ...prev, ...updatedInfo } : null);
      toast.success('Basic info saved successfully');
      router.push('/admin/academics');
    } catch (error) {
      console.error('Error saving basic info:', error);
      toast.error('Failed to save basic info');
    }
  };

  const handleContentUpdate = async (updatedContent: ProgramContent) => {
    try {
      const { error } = await supabase
        .from('program_content')
        .upsert({ ...updatedContent, program_id: programId });
      if (error) throw error;
      setContent(updatedContent);
      toast.success('Content saved successfully');
      router.push('/admin/academics');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    }
  };

  const handleFeaturesUpdate = async (updatedFeatures: ProgramFeature[]) => {
    try {
      const { error } = await supabase
        .from('program_features')
        .upsert(
          updatedFeatures.map(feature => ({
            ...feature,
            program_id: programId
          }))
        );
      if (error) throw error;
      setFeatures(updatedFeatures);
      toast.success('Features saved successfully');
      router.push('/admin/academics');
    } catch (error) {
      console.error('Error saving features:', error);
      toast.error('Failed to save features');
    }
  };

  const handleLevelsUpdate = async (updatedLevels: ProgramLevel[]) => {
    try {
      const { error } = await supabase
        .from('program_levels')
        .upsert(
          updatedLevels.map(level => ({
            ...level,
            program_id: programId
          }))
        );
      if (error) throw error;
      setLevels(updatedLevels);
      toast.success('Levels saved successfully');
      router.push('/admin/academics');
    } catch (error) {
      console.error('Error saving levels:', error);
      toast.error('Failed to save levels');
    }
  };

  const handleScheduleUpdate = async (updatedSchedule: ProgramSchedule) => {
    try {
      const { error } = await supabase
        .from('program_schedule')
        .upsert({ ...updatedSchedule, program_id: programId });
      if (error) throw error;
      setSchedule(updatedSchedule);
      toast.success('Schedule saved successfully');
      router.push('/admin/academics');
    } catch (error) {
      console.error('Error saving schedule:', error);
      toast.error('Failed to save schedule');
    }
  };

  const handleTuitionUpdate = async (updatedTuition: ProgramTuition[]) => {
    try {
      const { error } = await supabase
        .from('program_tuition')
        .upsert(
          updatedTuition.map(tuition => ({
            ...tuition,
            program_id: programId
          }))
        );
      if (error) throw error;
      setTuition(updatedTuition);
      toast.success('Tuition saved successfully');
      router.push('/admin/academics');
    } catch (error) {
      console.error('Error saving tuition:', error);
      toast.error('Failed to save tuition');
    }
  };

  const handleMaterialsUpdate = async (updatedMaterials: CourseMaterial[]) => {
    try {
      const { error } = await supabase
        .from('course_materials')
        .upsert(
          updatedMaterials.map(material => ({
            ...material,
            program_id: programId
          }))
        );
      if (error) throw error;
      setMaterials(updatedMaterials);
      toast.success('Materials saved successfully');
      router.push('/admin/academics');
    } catch (error) {
      console.error('Error saving materials:', error);
      toast.error('Failed to save materials');
    }
  };

  const tabs = [
    { name: 'Basic Info', id: 'basic' },
    { name: 'Content', id: 'content' },
    { name: 'Features', id: 'features' },
    { name: 'Levels', id: 'levels' },
    { name: 'Schedule', id: 'schedule' },
    { name: 'Tuition', id: 'tuition' },
    { name: 'Materials', id: 'materials' }
  ];

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
        <div className="bg-white rounded-lg shadow">
          <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
            <Tab.List className="flex space-x-1 rounded-t-lg bg-blue-900/20 p-1">
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                    ${selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-600'
                    }`
                  }
                >
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="p-4">
              <Tab.Panel>
                <BasicInfoEditor
                  program={program || { id: '', name: '', description: '', slug: '', theme: 'blue' } as Program}
                  onUpdate={handleBasicInfoUpdate}
                />
              </Tab.Panel>

              <Tab.Panel>
                <ContentEditor
                  content={content}
                  programId={programId ?? ''}
                  onUpdate={handleContentUpdate}
                />
              </Tab.Panel>

              <Tab.Panel>
                <FeaturesEditor
                  features={features}
                  programId={programId ?? ''}
                  onUpdate={handleFeaturesUpdate}
                />
              </Tab.Panel>

              <Tab.Panel>
                <LevelsEditor
                  levels={levels}
                  programId={programId ?? ''}
                  onUpdate={handleLevelsUpdate}
                />
              </Tab.Panel>

              <Tab.Panel>
                {schedule && (
                  <ScheduleEditor
                    schedule={schedule}
                    programId={programId ?? ''}
                    onUpdate={handleScheduleUpdate}
                  />
                )}
              </Tab.Panel>

              <Tab.Panel>
                <TuitionEditor
                  tuition={tuition}
                  programId={programId ?? ''}
                  onUpdate={handleTuitionUpdate}
                />
              </Tab.Panel>

              <Tab.Panel>
                <MaterialsEditor
                  materials={materials}
                  programId={programId ?? ''}
                  onUpdate={handleMaterialsUpdate}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
} 