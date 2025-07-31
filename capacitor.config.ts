import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.djwacko.cuemasters',
  appName: 'CueMasters DJ App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
