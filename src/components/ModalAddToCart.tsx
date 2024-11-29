import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function ModalAddToCart({ isOpen, setIsOpen }: Props) {
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
    setIsOpen(false)
  }
  const handleToCart = () => {
    router.push('/cart/5')
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
        <DialogPanel className="max-w-lg w-full rounded-lg bg-white shadow-2xl p-8">
          <DialogTitle className="font-bold text-2xl text-gray-800">
            🎉 Berhasil Ditambahkan ke Keranjang!
          </DialogTitle>
          <Description className="mt-4 text-gray-600">
            Apakah ingin melanjutkan belanja atau langsung ke pembayaran?
          </Description>
          <div className="flex justify-end gap-4 mt-6">
            <button
              className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 transition-all"
              onClick={handleBack}
            >
              Belanja Lagi
            </button>
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-all"
              onClick={handleToCart}
            >
              Bayar Sekarang
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
