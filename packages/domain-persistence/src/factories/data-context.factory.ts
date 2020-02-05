import { FirestoreDataContext, DataContext } from '../repositories/data-context';
import { getDatastore } from './datastore.factory';

export function getFirestoreDataContext(): DataContext {
    return new FirestoreDataContext(getDatastore());
}
