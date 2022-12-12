import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';

import { BaseService } from '@libs/shared';
import { CreateDocInput, Doc, DocDoc } from '@libs/shared/doc';

@Injectable()
export class DocService extends BaseService<DocDoc> {
  constructor(
    @InjectModel('Doc')
    private readonly docModel: Model<DocDoc>,
  ) {
    super(docModel);
  }

  async getDocs(input: Partial<Doc>): Promise<Doc[]> {
    return this.find(input).lean();
  }

  async createNewDoc(input: CreateDocInput): Promise<Doc> {
    return this.create(input);
  }
}
