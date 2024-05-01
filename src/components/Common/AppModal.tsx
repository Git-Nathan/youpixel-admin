import {Modal} from 'antd'
import {ReactNode, useState} from 'react'

export interface IAppModalProps {
  children: (showModal: () => void) => ReactNode
  handleConfirm: (closeModal: () => void, cancelLoading: () => void) => void
  title?: string
  content?: ReactNode
}

export default function AppModal(props: IAppModalProps) {
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setLoading(false)
    setIsModalOpen(false)
  }

  const cancelLoading = () => {
    setLoading(false)
  }

  const handleOk = () => {
    setLoading(true)
    props.handleConfirm(closeModal, cancelLoading)
  }

  return (
    <>
      {props.children(showModal)}
      <Modal
        title={props.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        confirmLoading={loading}
        centered
      >
        {props.content}
      </Modal>
    </>
  )
}
