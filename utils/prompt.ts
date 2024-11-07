export const promptBuilder = (
  prompt: string,
  imageStyle: string,
  imageColor: string
) => {
  const realisticPrompt = `Generate a highly realistic image of ${prompt} in ${
    imageColor ?? "a neutral color"
  } that mimics a photograph.
   The scene should be detailed, capturing natural lighting, authentic textures, and life-like proportions.
    Aim for a photo-realistic effect that accurately depicts the subject and surroundings, 
    with no exaggerated or stylized elements.`;

  const threeDPrompt = `Generate a detailed 3D-rendered image of ${prompt} in ${
    imageColor ?? "a neutral color"
  } with depth and dimensionality, making the subject appear three-dimensional and sculpted.
   Apply realistic or slightly exaggerated lighting and shadows, 
   giving a sense of volume and realism as in CGI or animation. 
   The final image should resemble a high-quality 3D model or digital art.`;

  const cyberpunkPrompt = `Generate a detailed cyberpunk-style image of ${prompt} in ${
    imageColor ?? "a neon color palette"
  } with futuristic, urban elements such as neon lights, glowing signs, and high-tech gadgets.
  The scene should include dark, moody atmospheres with a blend of contrasting lights and shadows,
  reflecting the gritty, dystopian aesthetic of cyberpunk worlds. 
  Focus on high-tech details, such as holographic displays, cybernetic enhancements, and futuristic architecture,
  while maintaining a sense of realism and depth in the overall composition.`;

  switch (imageStyle) {
    case "realistic":
      return realisticPrompt;
    case "3D":
      return threeDPrompt;
    case "Cyberpunk":
      return cyberpunkPrompt;
    default:
      return realisticPrompt;
  }
};
