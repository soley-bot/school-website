'use client';

import React, { useState, useEffect } from 'react';
import { getClientComponentClient } from '@/lib/supabase';
import type { ProgramPage, ProgramPageContent, ProgramPageLevel, ProgramPageFeature, ProgramPageSchedule, ProgramPageTuition, ProgramPageMaterial } from '@/types/database';
import { Tab } from '@headlessui/react';
import BasicInfoEditor from '@/components/admin/editors/BasicInfoEditor';
import ContentEditor from '@/components/admin/editors/ContentEditor';
import FeaturesEditor from '@/components/admin/editors/FeaturesEditor';
import LevelsEditor from '@/components/admin/editors/LevelsEditor';
import ScheduleEditor from '@/components/admin/editors/ScheduleEditor';
import TuitionEditor from '@/components/admin/editors/TuitionEditor';
import MaterialsEditor from '@/components/admin/editors/MaterialsEditor';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

interface ProgramEditorProps {
  programId: string;
}

export default function ProgramEditor({ programId }: ProgramEditorProps) {
  const supabase = getClientComponentClient();
  const router = useRouter();
  const { isLoading: authLoading, isAuthenticated } = useAuth();
  const [program, setProgram] = useState<ProgramPage | null>(null);
  const [content, setContent] = useState<ProgramPageContent | null>(null);
  const [levels, setLevels] = useState<ProgramPageLevel[]>([]);
  const [features, setFeatures] = useState<ProgramPageFeature[]>([]);
  const [schedule, setSchedule] = useState<ProgramPageSchedule | null>(null);
  const [tuition, setTuition] = useState<ProgramPageTuition[]>([]);
  const [materials, setMaterials] = useState<ProgramPageMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin/login');
      return;
    }

    if (!authLoading && isAuthenticated && programId) {
      loadProgramData();
    }
  }, [authLoading, isAuthenticated, programId, router]);

  const loadProgramData = async () => {
    if (!programId) return;

    try {
      // Fetch program basic info
      const { data: programData, error: programError } = await supabase
        .from('program_pages')
        .select('*')
        .eq('id', programId)
        .single();

      if (programError) {
        console.error('Error fetching program:', programError);
        toast.error('Failed to load program');
        router.push('/admin/academics');
        return;
      }

      if (!programData) {
        console.error('No program found');
        toast.error('Program not found');
        router.push('/admin/academics');
        return;
      }

      // Initialize all data with empty values
      let featuresData: ProgramPageFeature[] = [];
      let levelsData: ProgramPageLevel[] = [];
      let contentData: ProgramPageContent | null = null;
      let scheduleData: ProgramPageSchedule | null = null;
      let tuitionData: ProgramPageTuition[] = [];
      let materialsData: ProgramPageMaterial[] = [];

      try {
        // Fetch features
        const { data: features, error: featuresError } = await supabase
          .from('program_pages_features')
          .select('*')
          .eq('program_id', programId)
          .order('sort_order');
        
        if (featuresError) {
          console.error('Error fetching features:', featuresError);
        } else {
          featuresData = (features || []) as unknown[] as ProgramPageFeature[];
          console.log('Features data:', features);
        }
      } catch (e) {
        console.error('Failed to fetch features:', e);
      }

      try {
        // Fetch levels
        const { data: levels, error: levelsError } = await supabase
          .from('program_pages_levels')
          .select('*')
          .eq('program_id', programId)
          .order('sort_order');
        
        if (levelsError) {
          console.error('Error fetching levels:', levelsError);
        } else {
          levelsData = (levels || []) as unknown[] as ProgramPageLevel[];
          console.log('Levels data:', levels);
        }
      } catch (e) {
        console.error('Failed to fetch levels:', e);
      }

      try {
        // Fetch content
        const { data: content, error: contentError } = await supabase
          .from('program_pages_content')
          .select('*')
          .eq('program_id', programId)
          .maybeSingle();
        
        if (contentError) {
          console.error('Error fetching content:', contentError);
        } else {
          contentData = content as unknown as ProgramPageContent;
          console.log('Content data:', content);
        }
      } catch (e) {
        console.error('Failed to fetch content:', e);
      }

      try {
        // Fetch schedule
        const { data: schedule, error: scheduleError } = await supabase
          .from('program_pages_schedule')
          .select('*')
          .eq('program_id', programId)
          .maybeSingle();
        
        if (scheduleError) {
          console.error('Error fetching schedule:', scheduleError);
        } else {
          scheduleData = schedule as unknown as ProgramPageSchedule;
          console.log('Schedule data:', schedule);
        }
      } catch (e) {
        console.error('Failed to fetch schedule:', e);
      }

      try {
        // Fetch tuition
        const { data: tuition, error: tuitionError } = await supabase
          .from('program_pages_tuition')
          .select('*')
          .eq('program_id', programId)
          .order('sort_order');
        
        if (tuitionError) {
          console.error('Error fetching tuition:', tuitionError);
        } else {
          tuitionData = (tuition || []) as unknown[] as ProgramPageTuition[];
          console.log('Tuition data:', tuition);
        }
      } catch (e) {
        console.error('Failed to fetch tuition:', e);
      }

      try {
        // Fetch materials
        const { data: materials, error: materialsError } = await supabase
          .from('program_pages_materials')
          .select('*')
          .eq('program_id', programId)
          .order('sort_order');
        
        if (materialsError) {
          console.error('Error fetching materials:', materialsError);
        } else {
          materialsData = (materials || []) as unknown[] as ProgramPageMaterial[];
          console.log('Materials data:', materials);
        }
      } catch (e) {
        console.error('Failed to fetch materials:', e);
      }

      console.log('Fetched data:', {
        program: programData,
        features: featuresData,
        levels: levelsData,
        content: contentData,
        schedule: scheduleData,
        tuition: tuitionData,
        materials: materialsData
      });

      // Set state with proper type validation
      setProgram(programData as unknown as ProgramPage);
      setFeatures(featuresData);
      setLevels(levelsData);
      setContent(contentData);
      setSchedule(scheduleData);
      setTuition(tuitionData);
      setMaterials(materialsData);
    } catch (error) {
      console.error('Error loading program data:', error);
      toast.error('Failed to load program data');
      router.push('/admin/academics');
    } finally {
      setLoading(false);
    }
  };

  const handleBasicInfoUpdate = async (updatedInfo: Partial<ProgramPage>) => {
    try {
      const { error } = await supabase
        .from('program_pages')
        .update(updatedInfo)
        .eq('id', programId);

      if (error) throw error;
      
      setProgram(prev => prev ? { ...prev, ...updatedInfo } : null);
      toast.success('Basic info saved successfully');
      router.refresh();
    } catch (error) {
      console.error('Error saving basic info:', error);
      toast.error('Failed to save basic info');
    }
  };

  const handleContentUpdate = async (updatedContent: ProgramPageContent) => {
    try {
      const { error } = await supabase
        .from('program_pages_content')
        .upsert({
          ...updatedContent,
          program_id: programId
        });

      if (error) throw error;
      
      setContent(updatedContent);
      toast.success('Content saved successfully');
      router.refresh();
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    }
  };

  const handleFeaturesUpdate = async (updatedFeatures: ProgramPageFeature[]) => {
    try {
      // First delete existing features
      await supabase
        .from('program_pages_features')
        .delete()
        .eq('program_id', programId);

      // Then insert new ones
      const { error } = await supabase
        .from('program_pages_features')
        .insert(
          updatedFeatures.map((feature, index) => ({
            ...feature,
            program_id: programId,
            sort_order: index
          }))
        );

      if (error) throw error;
      
      setFeatures(updatedFeatures);
      toast.success('Features saved successfully');
      router.refresh();
    } catch (error) {
      console.error('Error saving features:', error);
      toast.error('Failed to save features');
    }
  };

  const handleLevelsUpdate = async (updatedLevels: ProgramPageLevel[]) => {
    try {
      // First delete existing levels
      await supabase
        .from('program_pages_levels')
        .delete()
        .eq('program_id', programId);

      // Then insert new ones
      const { error } = await supabase
        .from('program_pages_levels')
        .insert(
          updatedLevels.map((level, index) => ({
            ...level,
            program_id: programId,
            sort_order: index
          }))
        );

      if (error) throw error;
      
      setLevels(updatedLevels);
      toast.success('Levels saved successfully');
      router.refresh();
    } catch (error) {
      console.error('Error saving levels:', error);
      toast.error('Failed to save levels');
    }
  };

  const handleScheduleUpdate = async (updatedSchedule: ProgramPageSchedule) => {
    try {
      const { error } = await supabase
        .from('program_pages_schedule')
        .upsert({
          ...updatedSchedule,
          program_id: programId
        });

      if (error) throw error;
      
      setSchedule(updatedSchedule);
      toast.success('Schedule saved successfully');
      router.refresh();
    } catch (error) {
      console.error('Error saving schedule:', error);
      toast.error('Failed to save schedule');
    }
  };

  const handleTuitionUpdate = async (updatedTuition: ProgramPageTuition[]) => {
    try {
      // First delete existing tuition
      await supabase
        .from('program_pages_tuition')
        .delete()
        .eq('program_id', programId);

      // Then insert new ones
      const { error } = await supabase
        .from('program_pages_tuition')
        .insert(
          updatedTuition.map((tuition, index) => ({
            ...tuition,
            program_id: programId,
            sort_order: index
          }))
        );

      if (error) throw error;
      
      setTuition(updatedTuition);
      toast.success('Tuition saved successfully');
      router.refresh();
    } catch (error) {
      console.error('Error saving tuition:', error);
      toast.error('Failed to save tuition');
    }
  };

  const handleMaterialsUpdate = async (updatedMaterials: ProgramPageMaterial[]) => {
    try {
      // First delete existing materials
      await supabase
        .from('program_pages_materials')
        .delete()
        .eq('program_id', programId);

      // Then insert new ones
      const { error } = await supabase
        .from('program_pages_materials')
        .insert(
          updatedMaterials.map((material, index) => ({
            ...material,
            program_id: programId,
            sort_order: index
          }))
        );

      if (error) throw error;
      
      setMaterials(updatedMaterials);
      toast.success('Materials saved successfully');
      router.refresh();
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2596be]"></div>
      </div>
    );
  }

  if (!program && programId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h2>
          <p className="text-gray-600 mb-6">The program you're looking for could not be found. It may have been deleted or moved.</p>
          <button
            onClick={() => router.push('/admin/academics')}
            className="inline-flex items-center px-4 py-2 text-white bg-[#2596be] rounded-md hover:bg-[#1a7290]"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Programs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {program ? `Edit ${program.name}` : 'New Program'}
          </h1>
          <button
            onClick={() => router.push('/admin/academics')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Back to Programs
          </button>
        </div>

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
                {program && (
                  <BasicInfoEditor
                    program={program}
                    onUpdate={handleBasicInfoUpdate}
                  />
                )}
              </Tab.Panel>

              <Tab.Panel>
                <ContentEditor
                  content={content}
                  programId={programId}
                  onUpdate={handleContentUpdate}
                />
              </Tab.Panel>

              <Tab.Panel>
                <FeaturesEditor
                  features={features}
                  programId={programId}
                  onUpdate={handleFeaturesUpdate}
                />
              </Tab.Panel>

              <Tab.Panel>
                <LevelsEditor
                  levels={levels}
                  programId={programId}
                  onUpdate={handleLevelsUpdate}
                />
              </Tab.Panel>

              <Tab.Panel>
                <ScheduleEditor
                  schedule={schedule}
                  programId={programId}
                  onUpdate={handleScheduleUpdate}
                />
              </Tab.Panel>

              <Tab.Panel>
                <TuitionEditor
                  tuition={tuition}
                  programId={programId}
                  onUpdate={handleTuitionUpdate}
                />
              </Tab.Panel>

              <Tab.Panel>
                <MaterialsEditor
                  materials={materials}
                  programId={programId}
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