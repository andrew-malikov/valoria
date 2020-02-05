import { Datastore } from '@google-cloud/datastore';

/**
 * Provide authentication credentials
 * by setting the environment variable GOOGLE_APPLICATION_CREDENTIALS
 * with the file path of the JSON file that contains your service account key,
 * and [FILE_NAME] with the filename.
 */
export function getDatastore(): Datastore {
    return new Datastore();
}
