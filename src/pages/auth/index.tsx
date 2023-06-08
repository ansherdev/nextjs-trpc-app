import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { LoginForm, RegisterForm } from 'features';
import { trpc } from 'utils';

export default function AuthPage() {
  const hello = trpc.hello.useQuery({ text: 'client' });

  return (
    <Center height="100vh">
      <Tabs variant="soft-rounded">
        <Card p={5} width="md">
          <CardHeader>
            <TabList justifyContent="center">
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>
          </CardHeader>
          <CardBody>
            <TabPanels>
              <TabPanel p={0}>
                <LoginForm />
              </TabPanel>
              <TabPanel p={0}>
                <RegisterForm />
              </TabPanel>
            </TabPanels>
          </CardBody>
        </Card>
      </Tabs>
    </Center>
  );
}
