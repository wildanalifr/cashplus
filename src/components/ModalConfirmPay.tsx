import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function ModalConfirmPay({ isOpen, setIsOpen }: Props) {
  const router = useRouter()

  const handleConfirm = () => {
    setTimeout(() => {
      router.push('/')
      setIsOpen(false)
    }, 1000)
  }

  useEffect(() => {
    if (isOpen) {
      handleConfirm()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
        <DialogPanel className="max-w-lg w-full rounded-lg bg-white shadow-2xl p-8">
          <DialogTitle className="font-bold text-2xl text-gray-800">
            🎉 Pembayaran Berhasil!
          </DialogTitle>
          <Description className="mt-4 text-gray-600">
            Terimakasih atas pembeliannya 😀
          </Description>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
