import { NextPage } from 'next';
import Navigation from '../../components/navigation';
import { Property } from '../../models/property.model';
import React, { ChangeEvent, FocusEvent, FormEvent, MouseEvent, useState } from 'react';
import PropertyComponent from '../../components/property.component';
import { coerceBooleanProperty } from '../../shared/coercion/boolean-property';
import Checkbox from '../../components/checkbox';
import { SearchDateType } from '../../models/search-date-type.enum';
import PropertyService from '../../db/property.service';
import EditPropertyDialog from '../../components/edit-property.dialog';

export async function getServerSideProps(context): Promise<any> {
  const { data: results } = await PropertyService.getProperties({ isLive: true });
  return {
    props: {
      properties: results,
    },
  }
}

const INITIAL_FORM_STATE = {
  modernId: null,
  legacyId: null,
  isLive: true,
  name: null,
  address: null,
  city: null,
  state: null,
  zip: null,
  numberOfUnits: null,
  goLiveDate: null,
  goLiveDateType: null,
};

const PropertiesPage: NextPage = (ctx: any) => {
  const searchDirections: {label: string, value: any, hint: string}[] = [
    { label: 'Equals', value: SearchDateType.equals, hint: 'Went live on this date' },
    { label: 'Before', value: SearchDateType.lessThan, hint: 'Went live before this date'},
    { label: 'On or Before', value: SearchDateType.lessThanOrEqualTo, hint: 'Went live on or before this date'},
    { label: 'After', value: SearchDateType.greaterThan, hint: 'Went live after this date'},
    { label: 'On or After', value: SearchDateType.greaterThanOrEqualTo, hint: 'Went live on or after this date'}
  ];
  const [props, setProps]: [Property[], (value: Property[]) => void] = useState(ctx.properties)
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [showDialog, setShowDialog] = useState(false);
  const [showSearchDirections, setShowSearchDirections] = useState(false);
  let uiActions: any[] = [];
  const inputClasses =
    'block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring';

  const toggleIsLive = (event: ChangeEvent<HTMLInputElement>): void => {
    const oldValue = coerceBooleanProperty(form.isLive);
    const newValue = coerceBooleanProperty(event.target.checked);

    if (oldValue !== newValue) {
      const newForm = {...form, isLive: newValue};
      setForm(newForm);
    }
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dto = {...form,
      goLiveDateType: form.goLiveDate != null ? form.goLiveDateType.value : null,
    };

    for (const p in dto) {
      if (dto[p] === '') dto[p] = null;
    }

    PropertyService.getProperties(dto).then(res => {
      setForm({...dto,
        goLiveDateType: dto.goLiveDateType != null ? searchDirections.find(x => x.value == dto.goLiveDateType) : null,
      });
      setProps(res.data);
    });
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    form[key] = e.target.value;
  }

  const createDirectionItem = ({key, label, value, hint}: { key: any, label: string, value: any, hint: string }) => {
    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setForm({...form,
        goLiveDateType: {label, value, hint},
      });
      setShowSearchDirections(false);
    }
    return <a type="button" className="cursor-pointer block py-1" onClick={handleClick} key={key}>
      <h3 className="font-medium text-gray-700 dark:text-gray-100 hover:underline">
        {label}
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
    </a>;
  }

  const handleGoLiveDateTypeBlur = (ev: FocusEvent) => {
    ev.preventDefault();
    ev.stopPropagation();

    uiActions.push(() => {
      setShowSearchDirections(false);
    });

    setTimeout(() => {
      for (let i = 0; i < uiActions.length; i++) {
        uiActions[i]();
      }
      uiActions = [];
    }, 200)
  }

  const updateProperties = (item: Property) => {
    let upserted = false;
    const updated = [...props].map(x => {
      if (x.id === item.id) {
        upserted = true;
        return item;
      }
      return x;
    })

    if (!upserted) updated.push(item);

    setProps(updated);
  }

  return (
    <>
      <Navigation></Navigation>

      {/* SEARCH FILTERS */}
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Search Filters
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="modernId"
              >
                Modern ID
              </label>
              <input id="modernId" type="text" className={inputClasses} defaultValue={form?.modernId} onChange={e => handleInputChange(e, 'modernId')} />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="legacyId"
              >
                Legacy ID
              </label>
              <input id="legacyId" type="text" className={inputClasses} defaultValue={form?.legacyId} onChange={e => handleInputChange(e, 'legacyId')} />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="name"
              >
                Name
              </label>
              <input id="name" type="text" className={inputClasses} defaultValue={form?.name} onChange={(event) => handleInputChange(event, 'name')} />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="address"
              >
                Street Address
              </label>
              <input
                id="address"
                type="text"
                className={inputClasses}
                defaultValue={form?.address}
                onChange={e => handleInputChange(e, 'address')}
              />
            </div>

            <div>
              <label htmlFor="city" className="text-gray-700 dark:text-gray-200">
                City
              </label>
              <input id="city" type="text" className={inputClasses} defaultValue={form?.city} onChange={e => handleInputChange(e, 'city')} />
            </div>

            <div>
              <label htmlFor="state" className="text-gray-700 dark:text-gray-200">State</label>
              <input type="text" id="state" className={inputClasses} defaultValue={form?.state} onChange={e => handleInputChange(e, 'state')} />
            </div>

            <div>
              <label htmlFor="zip" className="text-gray-700 dark:text-gray-200">Zip</label>
              <input type="text" id="zip" className={inputClasses} defaultValue={form?.zip} onChange={e => handleInputChange(e, 'zip')} />
            </div>

            <div>
              <label htmlFor="numberOfUnits" className="text-gray-700 dark:text-gray-200">Number of Units</label>
              <input type="text" id="numberOfUnits" className={inputClasses} defaultValue={form?.numberOfUnits} onChange={e => handleInputChange(e, 'numberOfUnits')} />
            </div>

            <div>
              <label htmlFor="goLiveDate" className="text-gray-700 dark:text-gray-200">Go Live Date</label>
              <input type="text" id="goLiveDate" className={inputClasses} defaultValue={form?.goLiveDate} onChange={e => handleInputChange(e, 'goLiveDate')} />
            </div>

            <div className="relative w-full mx-auto">
              <label htmlFor="goLiveDateType" className="text-gray-700 dark:text-gray-200">
                Live Date Search Type
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
                <input type="text" id="goLiveDateType"
                  className={'pl-10 ' + inputClasses}
                  onFocus={e => setShowSearchDirections(!showSearchDirections)}
                  onBlur={handleGoLiveDateTypeBlur}
                  defaultValue={form?.goLiveDateType?.label}
                  onChange={e => handleInputChange(e, 'goLiveDateType')}
                  autoComplete="off" />
              </div>

              {
                showSearchDirections
                ? <div className="absolute inset-x-0 px-6 py-3 mt-4 overflow-y-auto bg-white border rounded-md max-h-72 dark:bg-gray-700 dark:border-transparent z-10">
                    {searchDirections.map((x, idx) => createDirectionItem({...x, key: idx}))}
                  </div>
                : null
              }
            </div>

            <Checkbox
              name={'isLive'}
              label={'Active'}
              isSelected={form?.isLive}
              onCheckboxChange={toggleIsLive}
            ></Checkbox>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>

      {/* SEARCH RESULTS */}
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white flex flex-row justify-between">
          <span>Search Results</span>

          <button type="button" className="button neutral" onClick={() => setShowDialog(true)}>
            Add Property
          </button>
          <EditPropertyDialog property={null} setShowDialog={setShowDialog} showDialog={showDialog} onClose={updateProperties}></EditPropertyDialog>
        </h2>

        {
          props && props.length
          ? props.map((prop, index) => <div className="p-2 md:p-8" key={`${prop.id}`}>
              <PropertyComponent item={prop} onChange={updateProperties}></PropertyComponent>
            </div>)
          : <div>No Results</div>
        }
      </section>
    </>
  );
}

export default PropertiesPage;

