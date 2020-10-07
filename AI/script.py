from __future__ import absolute_import, division, print_function, unicode_literals

# TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras

import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

# Helper libraries
import numpy as np
import matplotlib.pyplot as plt

TRAIN_DATA_URL = "train.csv"
TEST_DATA_URL = "eval.csv"

train_file_path = "C:\\Users\\neila\\Google Drive\\TicTacAI\\AI\\train.csv"
test_file_path = "C:\\Users\\neila\\Google Drive\\TicTacAI\\AI\\eval.csv"

np.set_printoptions(precision=3, suppress=True)

def get_dataset(file_path, **kwargs):
  dataset = tf.data.experimental.make_csv_dataset(
      file_path,
      na_value="?",
      label_name="play",
      num_epochs=10,
      ignore_errors=True,
      **kwargs)
  return dataset

tf.enable_eager_execution()
print(tf.executing_eagerly())

rowcols = ["row1", "row2", "row3", "row4", "row5", "row6", "row7", "row8", "row9", "play"]

raw_train_data = get_dataset(train_file_path, column_names=rowcols, batch_size=100000)

raw_test_data = get_dataset(test_file_path, column_names=rowcols, batch_size=10000)

def show_batch(dataset):
  for batch, label in dataset.take(1):
    for key, value in batch.items():
      print("{:20s}: {}".format(key,value.numpy()))

def pack(features, label):
  return tf.stack(list(features.values()), axis=-1), label

packed_train = raw_train_data.map(pack)

for features, labels in packed_train.take(1):
  rows_train = features.numpy()
  move_train = labels.numpy()

packed_test = raw_test_data.map(pack)

for features, labels in packed_test.take(1):
  rows_test = features.numpy()
  move_test = labels.numpy()


rows_train = rows_train / 1.0 - 0.5
rows_test = rows_test / 1.0 - 0.5


model = keras.Sequential([
    keras.layers.Dense(9, activation='relu'),
    keras.layers.Dense(9, activation='softmax')
])

model.compile(optimizer='Nadam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(),
              metrics=['accuracy'])

model.fit(rows_train, move_train, epochs=6)

print("[INFO] serializing network to '{}'...".format("saved_model.model"))
model.save("saved_model.model")

test_loss, test_acc = model.evaluate(rows_test, move_test, verbose=2)

# model.summary()

# print(model.layers[0].input_shape)

print('\nTest accuracy:', test_acc)

predictions = model.predict([[0, 0, 0, 0, 0, 0, 0, 0, 0]])
print(np.argmax(predictions[0]))