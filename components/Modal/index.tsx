import { IconX } from '@tabler/icons-react';
import { FC, ReactNode, useEffect, useRef } from 'react';

import { useTranslation } from 'next-i18next';

import styles from './index.module.scss';

import clsx from 'clsx';

interface Props {
  maskClosable?: boolean;
  modalContainerClassName?: string;
  modalClassName?: string
  headerClassName?: string;
  bodyClassName?: string;
  modalWidth?: number | string;
  title?: string | null;
  renderBody: ReactNode;
  renderFooter?: ReactNode;
  onClose: () => any;
  closeClassName?: string;
  closeSize?: number;
}

const Modal: FC<Props> = ({
  maskClosable = true,
  modalContainerClassName,
  modalClassName,
  headerClassName,
  bodyClassName,
  modalWidth,
  title,
  renderBody,
  onClose,
  closeClassName,
  closeSize = 14
}) => {
  const { t: modalTrans } = useTranslation('modal');

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        window.addEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      window.removeEventListener('mouseup', handleMouseUp);
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.addEventListener('keyup', handleKeyUp);
      }
      onClose();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      window.removeEventListener('keyup', handleKeyUp);
      onClose();
    };

    if (maskClosable) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      if (maskClosable) {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [maskClosable, onClose]);

  return (
    <div
      className={clsx(
        modalContainerClassName ?? '',
        styles.modalContaier,
        'fixed inset-0 z-[111] flex items-center justify-center bg-black bg-opacity-50',
      )}>
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='my-auto flex min-h-full items-center justify-center p-0 px-4 text-center sm:block'>
          <div
            className='hidden sm:inline-block sm:h-screen sm:align-middle'
            aria-hidden='true'
          />

          <div
            ref={modalRef}
            className={clsx(
              modalClassName ?? '',
              'inline-block transform overflow-hidden rounded-lg border-gray-300 bg-white text-left align-bottom text-[#0f172a] shadow-xl transition-all sm:my-8 sm:w-full sm:align-middle',
            )}
            style={{ width: modalWidth ?? 720 }}
            role='dialog'>
            {title !== undefined && <div className={clsx(styles.header, headerClassName ?? '')}>
              {title}
              <button
                onClick={onClose}
                className={clsx(
                  styles.close,
                  'flex h-[1.8rem] w-[1.8rem] items-center justify-center rounded-full bg-transparent text-[#9e9689] hover:border-transparent hover:bg-gray-200 hover:text-[#c3beb6]',
                  closeClassName ?? ''
                )}>
                <IconX size={closeSize} />
              </button>
            </div>}
            <div className={clsx(styles.body, bodyClassName ?? '')}>
              {renderBody}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
