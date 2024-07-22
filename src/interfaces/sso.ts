export interface LoginProviderDto {
  secretKey?: string;
  clientId: string;
  tenantId: string;
  loginProvider: number;
}

export type LoginProviderMetadata = Pick<
  LoginProviderDto,
  'clientId' | 'tenantId'
>;
