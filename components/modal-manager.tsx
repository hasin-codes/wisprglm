'use client';

import { useUIStore } from '@/lib/store';
import {
  SettingsModal,
  NotificationsModal,
  ProfileModal,
  DetailModal,
} from '@/components/modals';

export function ModalManager() {
  const { activeModal } = useUIStore();

  return (
    <>
      {activeModal === 'settings' && <SettingsModal />}
      {activeModal === 'notifications' && <NotificationsModal />}
      {activeModal === 'profile' && <ProfileModal />}
      {activeModal === 'detail' && <DetailModal />}
    </>
  );
}
