from keras.models import Sequential, load_model
from keras.layers import Conv2D, MaxPooling2D
from keras.layers import Activation, Dropout, Flatten, Dense
# from keras.utils import np_utils
import keras
import numpy as np
from PIL import Image

classes = ["carrot", "tomato", "potato", "cucumber", "onion"]
num_classes = len(classes)
image_size = 50


def build_model():
    model = Sequential()
    model.add(Conv2D(32, (5, 5), padding='same', input_shape=(50, 50, 5)))
    model.add(Activation('relu'))
    model.add(Conv2D(32, (5, 5)))
    model.add(Activation('relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Conv2D(64, (5, 5), padding='same'))
    model.add(Activation('relu'))
    model.add(Conv2D(64, (5, 5)))
    model.add(Activation('relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Flatten())
    model.add(Dense(512))
    model.add(Activation('relu'))
    model.add(Dropout(0.5))
    model.add(Dense(5))
    model.add(Activation('softmax'))

    opt = keras.optimizers.rmsprop(lr=0.0001, decay=1e-6)

    model.compile(loss='categorical_crossentropy', optimizer=opt,
            metrics=['accuracy'])

    # モデルのロード
    model = load_model('./food_cnn.hs')

    return model


def predict(fp):
    image = Image.open(fp)
    image = image.convert('RGB')
    image = image.resize((image_size, image_size))
    data = np.asarray(image)/255
    X = []
    X.append(data)
    X = np.array(X)
    model = build_model()
    
    result = model.predict([X])[0]
    predicted = result.argmax()
    percentage = int(result[predicted] * 100)
    return classes[predicted]
    # print("{0} ({1} %)".format(classes[predicted], percentage))

if __name__ == "__main__":
    predict()
