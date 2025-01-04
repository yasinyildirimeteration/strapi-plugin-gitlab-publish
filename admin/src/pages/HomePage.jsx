import React, { useState } from 'react';
import { PLUGIN_ID } from '../pluginId';

import { useFetchClient, useNotification } from '@strapi/strapi/admin';
import { Layouts, Page } from '@strapi/strapi/admin';
import { Button } from '@strapi/design-system';

const HomePage = () => {
  const { toggleNotification } = useNotification();
  const { get } = useFetchClient();
  const [busy, setBusy] = useState(false);

  const triggerPublish = async () => {
    if (busy === true) return;

    setBusy(true);
    try {
      const { data } = await get(`/${PLUGIN_ID}/publish`);
      if (data?.success !== true) {
        handleError({ message: 'call not succeded' });
      } else {
        handleSuccess();
      }
    } catch (e) {
      handleError(e);
    }
  };

  const handleSuccess = () => {
    toggleNotification({
      type: 'success',
      message: 'Pipeline launched ! Check it on GitLab to see progress.',
    });
  };

  const handleError = (e) => {
    toggleNotification({
      type: 'danger',
      message: `Error during process : ${e.message}`,
    });
    setBusy(false);
    throw new Error(e);
  };

  return (
    <Layouts.Root>
      <Page.Title children={'GitLab Publish'} />
      <Page.Main>
        <Layouts.Header
          title={'GitLab Publish'}
          subtitle={'Trigger GitLab pipeline in one click !'}
        />

        <Layouts.Content>
          <Button
            onClick={triggerPublish}
            startIcon={null}
            type="button"
            variant="primary"
            disabled={busy === true}
          >
            Deploy
          </Button>
        </Layouts.Content>
      </Page.Main>
    </Layouts.Root>
  );
};

export { HomePage };
