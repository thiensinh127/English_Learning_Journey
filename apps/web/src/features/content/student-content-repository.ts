import { fixtureContentRepository } from './fixture-repository';
import { createApprovedContentRepository } from './approved-content-repository';

const approvedStudentRepository = createApprovedContentRepository([], []);

export function getStudentContentRepository(options?: { demo?: boolean }) {
  if (options?.demo && process.env.NODE_ENV !== 'production') {
    return fixtureContentRepository;
  }
  return approvedStudentRepository;
}
