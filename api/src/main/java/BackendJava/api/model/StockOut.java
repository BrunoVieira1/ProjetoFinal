package BackendJava.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "stockout")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StockOut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private Long idProduct;

    @Column(nullable = false)
    private Integer qtt;

    @Column(nullable = false)
    private LocalDate date;

}