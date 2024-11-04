import { View, Text, Modal, Button } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

type Props = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateModal({ showModal, setShowModal } : Props) {
  return (
    <Modal animationType="slide" transparent visible={showModal}>
      <View
        className='h-1/2 mt-auto bg-[#191919] w-full rounded-t-3xl p-4'
      >

        <View className='flex-row justify-end '>
            <Feather name="x" size={24} color="white" onPress={() => setShowModal(() => false)}/>
        </View>

        {/* image Form */}
        <View className=' items-start '>
            {/* TODO: Image Form */}

        </View>

      </View>
    </Modal>
  );
}