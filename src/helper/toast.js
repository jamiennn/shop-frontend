import Swal from 'sweetalert2'
export const errorToast = (icon, title) => {
  const toast = Swal.mixin({
    target: '#custom-target',
    position: 'top-end',
    toast: true,
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  toast.fire({
    icon,
    title
  })
}

export const successToast = (icon, title) => {
  const toast = Swal.fire({
    position: 'top-end',
    icon,
    title,
    showConfirmButton: false,
    timer: 1500
  })
  toast.fire({
    icon,
    title
  })
}


