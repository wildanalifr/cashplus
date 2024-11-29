import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
} from '@heroicons/react/16/solid'

type Props = {
  typeSort: string
  onChange: (data: string) => void
}

export default function FilterSort({ typeSort, onChange }: Props) {
  return (
    <div className="relative w-52 text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          Options {typeSort.toUpperCase()}
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 absolute z-30 bg-gray-800 mt-1 rounded-lg"
        >
          <MenuItem>
            <button
              onClick={() => onChange('asc')}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            >
              <PencilIcon className="size-4 fill-white/30" />
              ASC
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => onChange('desc')}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            >
              <Square2StackIcon className="size-4 fill-white/30" />
              DESC
            </button>
          </MenuItem>

          {typeSort !== '' && (
            <MenuItem>
              <button
                onClick={() => onChange('')}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <Square2StackIcon className="size-4 fill-white/30" />
                RESET
              </button>
            </MenuItem>
          )}
        </MenuItems>
      </Menu>
    </div>
  )
}
