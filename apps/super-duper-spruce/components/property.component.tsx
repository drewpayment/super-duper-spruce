import { Property } from '../models/property.model';
import { formatRelative } from 'date-fns';
import EditPropertyDialog from './edit-property.dialog';
import { useState } from 'react';
import { IconButton, Icon, InfoIcon } from '@vechaiui/react';

const PropertyComponent = ({ item, onChange }: { item: Property, onChange: (item: Property) => void }) => {
  const [showDialog, setShowDialog] = useState(false);
  const sharedBadgeClass = 'px-3 py-1 text-xs uppercase rounded-full'
  const handleOpen = () => setShowDialog(true);
  return (
    <>
      <div className="w-full max-w-sm px-4 py-3 mx-auto bg-white rounded-md shadow-md dark:bg-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 dark:text-gray-400">
            {item?.numberOfUnits} units
          </span>
          <div className="flex flex-row justify-evenly items-center">
            <span className={
              item?.isLive ? `${sharedBadgeClass} text-blue-800 bg-blue-200 dark:bg-blue-300 dark:text-blue-900` : `${sharedBadgeClass} text-red-800 bg-red-200 dark:bg-red-300 dark:text-red-900`
            }>
              {item?.isLive ? 'Active' : 'Inactive'}
            </span>
            <IconButton className="mx-3 my-1 text-blue-500" onClick={handleOpen}>
              <Icon as={InfoIcon} label="edit" className="w-4 h-4"></Icon>
            </IconButton>
          </div>
        </div>

        <div>
          <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
            {item?.name}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {item?.address}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {item?.city}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {item?.state}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {item?.zip}
          </p>
        </div>

        <div>
          <div className="flex items-center mt-2 text-gray-700 dark:text-gray-200">
            {item?.goLiveDate ? `Live: ${formatRelative(new Date(item?.goLiveDate), new Date())}` : ''}
          </div>
        </div>
      </div>

      <EditPropertyDialog property={item} showDialog={showDialog} setShowDialog={setShowDialog} onClose={onChange}></EditPropertyDialog>
    </>
  );
}

export default PropertyComponent;
