import { Loader2 } from 'lucide-react';
import styles from './Loader.module.scss';

export const Loader = () => (
  <span role="status" aria-label="Loading..." className={styles.wrapper}>
    <Loader2 className={styles.loader} aria-hidden="true" />
  </span>
);
