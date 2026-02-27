import { Header } from './Header';
import { PageHeader } from './PageHeader';
import { TabNavigation } from './TabNavigation';
import { ProfileCard } from './ProfileCard';
import { LearningAnalytics } from './LearningAnalytics';
import { ProCard } from './ProCard';
import { SettingsCard } from './SettingsCard';
import { Footer } from './Footer';

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] flex flex-col">
      <Header />

      <main className="flex-1 flex justify-center py-8 px-4 md:px-10">
        <div className="w-full max-w-[1024px] flex flex-col gap-8">
          {/* Page Header */}
          <PageHeader
            title="个人中心与设置"
            description="管理您的学习进度、账户信息及订阅计划。"
          />

          {/* Tab Navigation */}
          <TabNavigation />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (2/3) */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <ProfileCard
                name="李明"
                englishName="Felix Li"
                avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuDcoU6PEEYAskRsmnIxzxlYJSoMF0J014RTrsioFrTvb9CE62rKkShVVbxMODXufiPQMXjr3VY7ioZTY1ebF-6gihX87GbCZ8B931K5x-rNwjDWyQzp6sUJxW8Q-A6sRNGbRMJaYlKd2QFlatTPeTW2Bj1eay9fkwyunpSEbxxrPoMSb9nzE1AFfC649ll1OIs_lXxMFBxt74-uJosutpI8jS8dlAj5Orh2cH9RfSjOJb66-eHdIjXkYwGNm2JSYL5ycO5cBgrw8XIt"
                joinDate="2023年10月"
                level="B2 中级"
                membership="PRO 会员"
                streak={12}
                xp={1250}
              />

              <LearningAnalytics />
            </div>

            {/* Right Column (1/3) */}
            <div className="flex flex-col gap-8">
              <ProCard
                planName="LinguaAI PRO"
                billingCycle="年度订阅计划"
                daysRemaining={285}
                nextBillingDate="2024年11月15日"
              />

              <SettingsCard
                language="zh-CN"
                reminderTime="20:00"
                darkMode={false}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProfilePage;
