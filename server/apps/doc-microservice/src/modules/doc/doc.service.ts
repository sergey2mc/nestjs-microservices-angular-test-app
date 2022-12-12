import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';
import { lastValueFrom } from 'rxjs';

import { BaseService } from '@libs/shared';
import { CreateDocInput, Doc, DocDoc } from '@libs/shared/doc';

import { UserClientService } from '../user/user-client.service';
import { User } from '@libs/shared/user';

@Injectable()
export class DocService extends BaseService<DocDoc> {
  constructor(
    @InjectModel('Doc')
    private readonly docModel: Model<DocDoc>,
    private readonly userClientService: UserClientService,
  ) {
    super(docModel);
  }

  async getDocs(input: Partial<Doc>): Promise<Doc[]> {
    const docs = await this.find(input).lean();
    const users: User[] = await this.userClientService.requestGetUsersByIds(
      docs.map(doc => new Types.ObjectId(doc.userId))
    );

    return docs.map(doc => {
      const user = users.find(user => new Types.ObjectId(doc.userId).equals(user._id));
      return {
        ...doc,
        title: user?.language
          ? `<${user?.language}>${doc.title}</${user?.language}>`
          : doc.title,
      }
    });
  }

  async createNewDoc(input: CreateDocInput): Promise<Doc> {
    return this.create(input);
  }
}
