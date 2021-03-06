import * as grpc from 'grpc';
import * as Hubspot from 'hubspot';
import { Field } from '../core/base-step';
import { FieldDefinition } from '../proto/cog_pb';

export class ClientWrapper {
  public static expectedAuthFields: Field[] = [{
    field: 'apiKey',
    type: FieldDefinition.Type.STRING,
    description: 'API Key',
  }];

  private client: Hubspot.default;

  constructor(auth: grpc.Metadata, clientConstructor = Hubspot.default) {
    this.client = new clientConstructor({
      apiKey: auth.get('apiKey').toString(),
    });
  }

  public async getContactByEmail(email: string): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.client.contacts.getByEmail(email).then((result) => {
        resolve(result);
      },                                          (error) => {
        reject(error.message);
      });
    });
  }

  public async createOrUpdateContact(email: string, contact: Object): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.client.contacts.createOrUpdate(email, contact).then((result) => {
        resolve(result);
      },                                                       (error) => {
        reject(error.message);
      });
    });
  }

  public async deleteContactByEmail(email: string): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      try {
        const contact = await this.client.contacts.getByEmail(email);
        const result = await this.client.contacts.delete(contact['vid']);
        resolve(result);
      } catch (e) {
        reject(e.message);
      }
    });
  }
}
