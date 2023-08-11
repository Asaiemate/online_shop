import React from 'react';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AvatarPlaceholder} from '../icons/AvatarPlaceholder';
import RNModal from 'react-native-modal';
import ImageCropPicker from 'react-native-image-crop-picker';
import {NotificationContext} from '../context/NotificationProvider';

interface Props {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
}

export const CircleImage = (props: Props) => {
  const {imageUrl, setImageUrl} = props;
  const [modal, setModal] = React.useState<boolean>(false);
  const {height: deviceHeight, width: deviceWidth} = Dimensions.get('screen');
  const notification = React.useContext(NotificationContext);

  const closeModal = () => setModal(false);

  const loadImage = async (type: 'camera' | 'library') => {
    try {
      const granted = await PermissionsAndroid.request(
        type === 'camera'
          ? PermissionsAndroid.PERMISSIONS.CAMERA
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        closeModal();
        notification.setNotification({title: 'Запрещено', type: 'warning'});
        return;
      }
    } catch (err) {
      console.log('err', err);
    }

    const loader =
      type === 'camera'
        ? ImageCropPicker.openCamera
        : ImageCropPicker.openPicker;
    loader({
      cropping: true,
      width: 1000,
      height: 1000,
      cropperCircleOverlay: true,
    })
      .then(res => {
        setImageUrl(res.sourceURL ?? res.path);
        closeModal();
      })
      .catch(err => console.log('CropError', err));
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModal(true)}
        style={styles.imageWrapper}>
        {imageUrl ? (
          <Image source={{uri: imageUrl}} style={styles.image} />
        ) : (
          <AvatarPlaceholder size={100} />
        )}
      </TouchableOpacity>

      <RNModal
        isVisible={modal}
        statusBarTranslucent={true}
        backdropOpacity={0.5}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        onSwipeComplete={closeModal}
        style={styles.modal}
        swipeDirection={'up'}
        deviceHeight={deviceHeight}
        deviceWidth={deviceWidth}
        propagateSwipe={true}
        backdropTransitionOutTiming={0}>
        <View style={styles.modalContainer}>
          <Text onPress={() => loadImage('camera')} style={styles.modalItem}>
            Камера
          </Text>
          <Text onPress={() => loadImage('library')} style={styles.modalItem}>
            Галерея
          </Text>
          {imageUrl ? (
            <Text onPress={() => setImageUrl(null)} style={styles.modalItem}>
              Удалить
            </Text>
          ) : null}
          <Text onPress={closeModal} style={styles.modalItem}>
            Выход
          </Text>
        </View>
      </RNModal>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  modal: {
    marginBottom: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    // backgroundColor: 'white',
  },
  modalItem: {
    backgroundColor: 'white',

    padding: 10,
    borderRadius: 16,
    marginBottom: 16,
  },
});
