import Swal from 'sweetalert2'
export const errorToast = (icon, title) => {
  const toast = Swal.mixin({
    target: '#custom-target',
    position: 'top',
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
  Swal.fire({
    position: 'center',
    icon,
    title,
    showConfirmButton: false,
    timer: 1500
  })
}


