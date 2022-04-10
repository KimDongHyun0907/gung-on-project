
from PIL import Image

from torchvision import transforms, models

def segmentation(img_dir):
    #img_dir = "C:/Users/JaeHyun/Flask/projects/myproject/image_data/test.jepg"

    model = models.segmentation.deeplabv3_resnet101(pretrained=True).eval()

    pic = Image.open(img_dir)

    back_input = 128

    image_size = back_input

    transform_img = transforms.Compose([
        transforms.ToTensor(),
        transforms.Resize((image_size,image_size)),
        transforms.Normalize(
        mean=[0.5, 0.5, 0.5],
        std=[0.5, 0.5, 0.5])
    ])

    prepro_img = transform_img(pic)
    predic = model(prepro_img)['out']
    mask = (predic == 15).astype(float) * 255
    mask_img = Image.fromarray(mask)
    file_name = "filename"
    mask_img.save(file_name + "gif")
    return file_name + "gif"