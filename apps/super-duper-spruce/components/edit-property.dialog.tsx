import React, { FormEvent, useState } from 'react';
import { Property } from '../models/property.model';
import { Dialog, Transition } from "@headlessui/react";
import { cx, XIcon } from "@vechaiui/react";
import { format } from 'date-fns';
import PropertyService from '../db/property.service';

const INITIAL_FORM_STATE = {
  id: null,
  name: null,
  legacyId: null,
  address: null,
  city: null,
  state: null,
  zip: null,
  isLive: null,
  goLiveDate: null,
  numberOfUnits: null,
  createdAt: null,
  updatedAt: null,
}
const EditPropertyDialog = ({ property: item, showDialog, setShowDialog, onClose }:
  { property: Property,
    showDialog: boolean,
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>,
    onClose?: (result?: Property) => void,
   }) => {
  const [form, setForm] = useState({...INITIAL_FORM_STATE, ...item});
  const inputClasses = 'block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring';
  const completeButtonRef = React.useRef(null);
  const handleClose = (item?: Property) => {
    if (item) onClose(item);
    setShowDialog(false);
  };

  const updateForm = (key: string, value: any) => {
    const updated = {...form};
    updated[key] = value;
    setForm(updated);
  }

  const handleFormSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    if (!form.id) {
      PropertyService.addProperty(form).then(res => handleClose(res.data))
    } else {
      PropertyService.updateProperty(form).then(res => handleClose(res.data))
    }
  }

  return (
    <>
      <Transition show={showDialog} as={React.Fragment}>
        <Dialog
          initialFocus={completeButtonRef}
          as="div"
          className="fixed inset-0 overflow-y-auto z-modal"
          open={showDialog}
          onClose={() => handleClose()}
        >
          <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-blackAlpha-600" />
          <Transition.Child
            as={React.Fragment}
            enter="transition ease-out duration-150"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <div
              className={cx(
                "relative flex flex-col w-full mx-auto my-24 rounded shadow-lg",
                "bg-white border border-gray-200",
                "text-white",
                "dark:bg-neutral-800 dark:border-neutral-700",
                "max-w-md"
              )}
            >
              <header
                className="relative px-6 py-5 text-lg font-semibold"
              >
                {item?.name || 'New Property'}
              </header>
              <button
                onClick={() => handleClose()}
                className={cx(
                  "absolute text-sm cursor-base text-gray-600 dark:text-gray-400 hover:text-primary-500 top-4 right-4"
                )}
              >
                <XIcon label='x' className="w-4 h-4" />
              </button>

              <form onSubmit={handleFormSubmit}>
                <div className="flex-1 px-6 py-2">
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name">Name</label>
                      <input id="name" type="text" className={inputClasses} defaultValue={item?.name} onChange={e => updateForm('name', e.target.value)} />
                    </div>

                    <div>
                      <label htmlFor="address">Address</label>
                      <input id="address" type="text" className={inputClasses} defaultValue={item?.address} onChange={e => updateForm('address', e.target.value)} />
                    </div>

                    <div>
                      <label htmlFor="city">City</label>
                      <input id="city" type="text" className={inputClasses} defaultValue={item?.city} onChange={e => updateForm('city', e.target.value)} />
                    </div>

                    <div>
                      <label htmlFor="state">State</label>
                      <input id="state" type="text" className={inputClasses} defaultValue={item?.state} onChange={e => updateForm('state', e.target.value)} />
                    </div>

                    <div>
                      <label htmlFor="zip">Zip</label>
                      <input id="zip" type="text" className={inputClasses} defaultValue={item?.zip} onChange={e => updateForm('zip', e.target.value)} />
                    </div>

                    <div>
                      <label htmlFor="numberOfUnits">No of Units</label>
                      <input id="numberOfUnits" type="text" className={inputClasses} defaultValue={item?.numberOfUnits} onChange={e => updateForm('numberOfUnits', e.target.value)} />
                    </div>

                    <div>
                      <label htmlFor="goLiveDate">Activation Date</label>
                      <input id="goLiveDate" type="text" className={inputClasses} defaultValue={item?.goLiveDate != null ? format(new Date(item?.goLiveDate), 'M-d-yyyy') : null} onChange={e => updateForm('goLiveDate', e.target.value)} />
                    </div>
                  </div>
                </div>
                <footer className="flex flex-row justify-between px-6 py-4">
                  <button ref={completeButtonRef} onClick={() => handleClose()} className="button cancel">
                    Cancel
                  </button>

                  <button onClick={() => console.dir(item)} className="button save">
                    Save
                  </button>
                </footer>
              </form>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

export default EditPropertyDialog
