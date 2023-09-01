import React from "react";
import Image from "next/image";

function ModelDescription() {
  return (
    <div className="bg-white rounded-lg mx-6 my-4 p-4 border">
      <h2 className="w-full border-b border-grey pb-2">Model Description</h2>
      <div className="flex gap-4 justify-between items-center">
        {" "}
        <div className="py-4 w-[60%]">
          <h2> Structure</h2>
          <Image
            src="/descr_placeholder.png"
            alt="logo_bookend"
            width={264}
            height={93}
            className="object-cover p-4"
          />
          <p className="text-xs font-normal py-4 ">
            SDXL consists of an ensemble of experts pipeline for latent
            diffusion: In a first step, the base model is used to generate
            (noisy) latents, which are then further processed with a refinement
            model (available here:
            https://huggingface.co/stabilityai/stable-diffusion-xl-refiner-1.0/)
            specialized for the final denoising steps. Note that the base model
            can be used as a standalone module. Alternatively, we can use a
            two-stage pipeline as follows: First, the base model is used to
            generate latents of the desired output size. In the second step, we
            use a specialized high-resolution model and apply a technique called
            SDEdit (https://arxiv.org/abs/2108.01073, also known as) to the
            latents generated in the first step, using the same prompt. This
            technique is slightly slower than the first one, as it requires more
            function evaluations.
          </p>
        </div>
        <div className="bg-light-grey flex flex-col w-[40%] border my-2 gap-2 p-4 rounded-lg ">
          <h3 className="text-[#444445] font-medium text-base pb-4">
            Version History
          </h3>
          <p className="text-xs my-2">lorem ipsum dolor</p>
          <p className="text-xs my-2">lorem ipsum dolor</p>
          <p className="text-xs my-2">lorem ipsum dolor</p>
          <p className="text-xs my-2">lorem ipsum dolor</p>
          <p className="text-xs my-2">lorem ipsum dolor</p>
        </div>
      </div>
    </div>
  );
}

export default ModelDescription;
