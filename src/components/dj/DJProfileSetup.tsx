import { useDJProfileSetup } from "@/hooks/dj/use-dj-profile-setup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FoundersCampaignAlert, 
  ProfileForm, 
  ProfileManagementSections 
} from "./DJProfileSetup.parts";

const DJProfileSetup = () => {
  const { 
    user,
    loading, 
    formData, 
    isEditing, 
    handleInputChange, 
    handleSubmit,
    isDonating,
    handleSupportProject
  } = useDJProfileSetup();

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {isEditing ? 'Actualizar Perfil de DJ' : 'Completa tu Perfil de DJ'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isEditing && (
          <FoundersCampaignAlert 
            isDonating={isDonating} 
            onSupportProject={handleSupportProject} 
          />
        )}
        
        <ProfileForm 
          formData={formData}
          loading={loading}
          isEditing={isEditing}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        
        {isEditing && user && (
          <ProfileManagementSections userId={user.id} />
        )}
      </CardContent>
    </Card>
  );
};

export default DJProfileSetup;