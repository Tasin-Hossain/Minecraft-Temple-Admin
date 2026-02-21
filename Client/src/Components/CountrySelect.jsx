import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';

export const CountrySelect = ({ label, id, value, onChange, className = '' }) => {
  const options = countryList().getData();
  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-[14px] opacity-90">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-md border bg-(--card-foreground) border-(--border) px-4 py-2.5 text-(--text) text-left outline-none focus:border-(--theme) text-[14px] flex items-center gap-2">
            <ReactCountryFlag
              countryCode={value || 'BD'}
              svg
              style={{ width: '1.5em', height: '1.5em', borderRadius: '2px' }}
            />
            <span className="block truncate">
              {selectedOption ? selectedOption.label : 'Select country...'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-(--muted-text)" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-(--card-foreground) py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-[var(--border)]">
              {options.map((country) => (
                <Listbox.Option
                  key={country.value}
                  value={country.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-(--theme)/10 text-(--theme)' : 'text-(--text)'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`flex items-center gap-3 truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <ReactCountryFlag
                            countryCode={country.value}
                            svg
                            style={{ width: '1.5em', height: '1.5em', borderRadius: '2px' }}
                          />
                        </span>
                        {country.label}
                      </span>

                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-(--theme)">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};