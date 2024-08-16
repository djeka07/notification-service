import { ServiceBusMessage } from '@azure/service-bus';

export type ExtendedServiceBusMessage<T> = Omit<ServiceBusMessage, 'body'> & {
  body: T;
};
