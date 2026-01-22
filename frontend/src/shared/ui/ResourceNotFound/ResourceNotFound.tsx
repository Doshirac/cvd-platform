import classNames from 'classnames';
import { Icon } from '@shared/ui/Icon';
import styles from './ResourceNotFound.module.scss';

interface ResourceNotFoundProps {
  title?: string;
  message?: string;
  className?: string;
}

export const ResourceNotFound = (props: ResourceNotFoundProps) => {
  const { title = 'No results found', message = 'Try adjusting your search or filters', className } = props;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.icon}>
        <Icon name="SEARCH" size="large" color="muted" ariaLabel="Search icon" />
      </div>
      <h3 className={classNames('medium-18', styles.title)}>{title}</h3>
      {message && (
        <p className={classNames('regular-14', styles.subtitle)}>{message}</p>
      )}
    </div>
  );
};
